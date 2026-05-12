-- migrate:up

CREATE TABLE IF NOT EXISTS streams (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT UNIQUE REFERENCES players(id) NOT NULL,
  provider_id TEXT NULL,
  meta JSONB,
  rtmps_url TEXT,
  stream_key TEXT,
  viewer_url TEXT,
  status TEXT DEFAULT 'pending',
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_streams_status ON streams(status);
CREATE INDEX IF NOT EXISTS idx_streams_updated_at ON streams(updated_at);

COMMENT ON TABLE streams IS '@omit create,update,delete';
COMMENT ON COLUMN streams.stream_key IS '@omit';

GRANT SELECT ON streams TO authenticated_user;
GRANT SELECT ON streams TO anonymous;

CREATE OR REPLACE TRIGGER update_streams_updated_at
BEFORE UPDATE ON streams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- 📹 Create a new stream for current player
CREATE OR REPLACE FUNCTION create_stream()
RETURNS streams AS $$
DECLARE
  upserted_stream streams;
BEGIN
  INSERT INTO streams (player_id, meta)
  VALUES (current_player_id(), '{}')
  ON CONFLICT (player_id)
  DO UPDATE SET
    updated_at = NOW()
  RETURNING * INTO upserted_stream;

  PERFORM graphile_worker.add_job(
    'create_stream',
    json_build_object(
      'playerId', upserted_stream.player_id,
      'streamId', upserted_stream.id
    ),
    queue_name := 'streams'
  );

  RETURN upserted_stream;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION create_stream() TO authenticated_user;

-- TODO: Rename this to players_stream_key and adjust gql
-- 🔑 Return the stream key (only works for current player)
CREATE OR REPLACE FUNCTION players_current_stream_key(players players)
RETURNS TEXT AS $$
DECLARE
  stream_key TEXT;
BEGIN
  SELECT s.stream_key
  INTO stream_key
  FROM streams s
  WHERE s.player_id = players.id
    AND s.player_id = current_player_id();

  RETURN stream_key;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
COMMENT ON FUNCTION players_current_stream_key(players) IS 'Returns the current stream key for the authenticated player.';
GRANT EXECUTE ON FUNCTION players_current_stream_key(players) TO authenticated_user;

-- migrate:down

