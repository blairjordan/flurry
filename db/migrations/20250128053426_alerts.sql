-- migrate:up

-- 📢 Alerts table to store alert configurations
CREATE TABLE IF NOT EXISTS alerts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  message TEXT,
  options JSONB NOT NULL DEFAULT '[]', -- Array of {label: string, value: string}
  meta JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

GRANT SELECT ON alerts TO authenticated_user;
GRANT SELECT ON alerts TO anonymous;

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- 👤 Player alerts to track responses
CREATE TABLE IF NOT EXISTS player_alerts (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES players(id) NOT NULL,
  alert_id BIGINT REFERENCES alerts(id) NOT NULL,
  response TEXT, -- The selected option value
  acknowledged_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

GRANT SELECT ON player_alerts TO authenticated_user;

ALTER TABLE player_alerts ENABLE ROW LEVEL SECURITY;


CREATE INDEX IF NOT EXISTS idx_player_alerts_player_id ON player_alerts(player_id);
CREATE INDEX IF NOT EXISTS idx_player_alerts_alert_id ON player_alerts(alert_id);
CREATE INDEX IF NOT EXISTS idx_player_alerts_acknowledged ON player_alerts(player_id, acknowledged_at) 
  WHERE acknowledged_at IS NULL;

-- 🔒 Security policies
CREATE POLICY player_alerts_select ON player_alerts
  FOR SELECT TO authenticated_user
  USING (player_id = current_player_id());

CREATE POLICY alerts_select ON alerts
  FOR SELECT TO authenticated_user
  USING (
    EXISTS (
      SELECT 1 FROM player_alerts pa 
      WHERE pa.alert_id = alerts.id 
      AND pa.player_id = current_player_id()
    )
  );

-- ✅ Function to acknowledge an alert
CREATE OR REPLACE FUNCTION acknowledge_alert(
  player_alert_id BIGINT,
  response TEXT DEFAULT NULL
)
RETURNS player_alerts AS $$
DECLARE
  target_alert alerts;
  target_player_alert player_alerts;
BEGIN
  -- Get the player_alert first
  SELECT * INTO target_player_alert
  FROM player_alerts
  WHERE id = player_alert_id
    AND player_id = current_player_id()
    AND acknowledged_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Alert not found or already acknowledged';
  END IF;

  -- Get the alert to validate the response
  SELECT * INTO target_alert
  FROM alerts
  WHERE id = target_player_alert.alert_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Alert not found';
  END IF;

  -- Validate response is one of the allowed options
  IF response IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM jsonb_array_elements(target_alert.options) AS opt
    WHERE opt->>'value' = response
  ) THEN
    RAISE EXCEPTION 'Invalid response option';
  END IF;

  -- Update the player_alert
  UPDATE player_alerts
  SET 
    response = COALESCE(acknowledge_alert.response, player_alerts.response),
    acknowledged_at = NOW()
  WHERE id = player_alert_id
  RETURNING * INTO target_player_alert;

  RETURN target_player_alert;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION acknowledge_alert(BIGINT, TEXT) TO authenticated_user;

-- migrate:down
