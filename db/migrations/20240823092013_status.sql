-- migrate:up
CREATE OR REPLACE FUNCTION update_status(player_secret TEXT, status JSONB)
RETURNS public.players AS $$
DECLARE
  updated_player players;
BEGIN
  UPDATE players
  SET meta = jsonb_set(meta, '{status}', status)
  WHERE provider_id = (
    SELECT provider_id
    FROM players
    WHERE md5(concat(provider_id, current_setting('custom.server_secret_key'))) = player_secret
  )
  RETURNING * INTO updated_player;

  RETURN updated_player;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION update_status(TEXT, JSONB) TO anonymous, authenticated_user;

-- migrate:down

