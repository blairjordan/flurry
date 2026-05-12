-- migrate:up

CREATE EXTENSION IF NOT EXISTS postgis;

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_catalog.pg_tables WHERE tablename = 'schema_migrations') THEN
    COMMENT ON TABLE schema_migrations IS '@omit';
  END IF;
END
$$;

-- Create db roles 🎭
DO
$do$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated_user') THEN
    CREATE ROLE authenticated_user;
  END IF;

  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anonymous') THEN
    CREATE ROLE anonymous;
  END IF;

  GRANT anonymous, authenticated_user TO flurryuser;
END
$do$;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.updated_at IS NULL) THEN
    NEW.updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS players (
  id BIGSERIAL PRIMARY KEY,
  provider_id TEXT UNIQUE,
  username TEXT NOT NULL,
  meta JSONB,
  position JSONB,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1
      FROM pg_trigger
      WHERE tgname = 'update_players_updated_at'
    ) THEN
      CREATE TRIGGER update_players_updated_at
      BEFORE UPDATE ON players
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

CREATE OR REPLACE FUNCTION current_player_provider_id() RETURNS TEXT as $$
  SELECT current_setting('player.provider_id', true)::TEXT;
$$ LANGUAGE sql STABLE;
GRANT EXECUTE ON FUNCTION current_player_provider_id() TO authenticated_user;

CREATE OR REPLACE FUNCTION current_player_id() RETURNS BIGINT as $$
  SELECT id
  FROM players
  WHERE provider_id = current_setting('player.provider_id', true)::TEXT;
$$ LANGUAGE sql STABLE;
GRANT EXECUTE ON FUNCTION current_player_id() TO authenticated_user;

GRANT SELECT ON players TO anonymous;

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- 🔄 Can only UPDATE own players record
DROP POLICY IF EXISTS player_crud_update ON players;
CREATE POLICY player_crud_update ON players
FOR UPDATE
TO authenticated_user
USING (provider_id = current_player_provider_id());

GRANT SELECT ON players TO authenticated_user;
GRANT UPDATE (meta, position) ON players TO authenticated_user;

-- 👀 Can SELECT all other players
DROP POLICY IF EXISTS player_crud_select ON players;
CREATE POLICY player_crud_select ON players
FOR SELECT
TO public
USING (true);

-- 🏓 ping() function for current player to notify online
CREATE OR REPLACE FUNCTION ping()
RETURNS players AS $$
DECLARE
  updated_player players;
BEGIN
  UPDATE players
  SET updated_at = NOW()
  WHERE id = current_player_id()
  RETURNING * INTO updated_player;

  RETURN updated_player;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION ping() to authenticated_user;

-- 🎮 Current player function
CREATE OR REPLACE FUNCTION current_player()
RETURNS players AS $$
  SELECT * FROM players
  WHERE id = current_player_id();
$$ LANGUAGE sql STABLE;
GRANT EXECUTE ON FUNCTION current_player() TO authenticated_user;

CREATE TABLE IF NOT EXISTS items (
  id BIGSERIAL PRIMARY KEY,
  item_key VARCHAR(55) NOT NULL,
  name TEXT NOT NULL,
  type VARCHAR(55),
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0.00,
  props JSONB
);
GRANT SELECT ON items TO authenticated_user;
GRANT SELECT ON items TO anonymous;

CREATE TABLE IF NOT EXISTS player_items (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES players(id) NOT NULL,
  item_id BIGINT REFERENCES items(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_equipped BOOLEAN DEFAULT FALSE,
  props JSONB
);
GRANT SELECT ON player_items TO anonymous;
GRANT SELECT ON player_items TO authenticated_user;

CREATE UNIQUE INDEX IF NOT EXISTS player_items_unq ON player_items(player_id, item_id);
CREATE INDEX IF NOT EXISTS idx_player_items_player_id ON player_items(player_id);
CREATE INDEX IF NOT EXISTS idx_player_items_item_id ON player_items(item_id);

-- 📰 PostGraphile GQL subscription for player item updates
CREATE OR REPLACE FUNCTION notify_player_item_changes()
  RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    PERFORM pg_notify(
      'postgraphile:player_updated',
      json_build_object(
        '__node__', json_build_array(
          'players',
          (SELECT NEW.player_id)
        )
      )::text
    );
  ELSIF (TG_OP = 'DELETE') THEN
    PERFORM pg_notify(
      'postgraphile:player_updated',
      json_build_object(
        '__node__', json_build_array(
          'players',
          (SELECT OLD.player_id)
        )
      )::text
    );
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION notify_player_item_changes() IS '@omit';
GRANT EXECUTE ON FUNCTION notify_player_item_changes() TO authenticated_user;

-- 🔫 Trigger for player item updates
CREATE OR REPLACE TRIGGER player_item_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON player_items
  FOR EACH ROW
  EXECUTE FUNCTION notify_player_item_changes();

-- ⌛ Set is_online interval
CREATE OR REPLACE FUNCTION is_online_interval() RETURNS INTERVAL AS $$
  SELECT INTERVAL '5 minutes';
$$ LANGUAGE sql IMMUTABLE;
COMMENT ON FUNCTION is_online_interval() IS '@omit';

-- 🟢 Custom isOnline field
CREATE OR REPLACE FUNCTION players_is_online(players players) RETURNS text AS $$
  SELECT players.updated_at > NOW() - is_online_interval()
$$ LANGUAGE sql STABLE;

-- ✉️ Messages
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES players(id) NOT NULL,
  target_player_id BIGINT REFERENCES players(id),
  message TEXT NOT NULL,
  meta JSONB,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

GRANT SELECT ON messages TO authenticated_user;
GRANT SELECT ON messages TO anonymous;

CREATE INDEX IF NOT EXISTS idx_messages_player_id ON messages(player_id);
CREATE INDEX IF NOT EXISTS idx_messages_target_player_id ON messages(target_player_id);

-- 🌏 PostGraphile GQL subscription for global message
CREATE OR REPLACE FUNCTION notify_global_message()
  RETURNS TRIGGER AS
$$
DECLARE
BEGIN
  IF (TG_OP = 'INSERT' AND NOT NEW.is_direct_message) THEN
    PERFORM pg_notify(
      'postgraphile:global_message_received',
      json_build_object(
        '__node__', json_build_array(
          'messages',
          (SELECT NEW.id)
        )
      )::text
    );
    RETURN NULL;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 🔫 Trigger for global message updates
CREATE OR REPLACE TRIGGER messages_global_trigger
  AFTER INSERT
  ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_global_message();

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated_user;

-- 🪑 Inserts an item for current user
CREATE OR REPLACE FUNCTION upsert_player_item(target_item_id BIGINT, props JSONB DEFAULT '{}')
RETURNS VOID AS $$
BEGIN
  INSERT INTO player_items (player_id, item_id, props)
  VALUES (current_player_id(), target_item_id, props)
  ON CONFLICT (player_id, item_id)
  DO UPDATE SET props = EXCLUDED.props;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION upsert_player_item(BIGINT, JSONB) TO authenticated_user;

-- 📨 Inserts a message for current user
CREATE OR REPLACE FUNCTION insert_message(message TEXT, target_player_id BIGINT DEFAULT NULL)
RETURNS VOID AS $$
DECLARE
BEGIN

  IF target_player_id = current_player_id() THEN
    RAISE EXCEPTION 'Cannot send message to self.';
  END IF;

  INSERT INTO messages (player_id, target_player_id, message)
  VALUES (current_player_id(), target_player_id, message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION insert_message(message TEXT, target_player_id BIGINT) TO authenticated_user;

-- 📍 Marker objects
CREATE TABLE IF NOT EXISTS markers (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(55),
  props JSONB
);

CREATE INDEX IF NOT EXISTS idx_markers_type ON markers(type);

GRANT SELECT ON markers TO authenticated_user;
GRANT SELECT ON markers TO anonymous;

-- ↔️ Player markers
CREATE TABLE IF NOT EXISTS player_markers (
  player_id BIGINT REFERENCES players(id),
  marker_id BIGINT REFERENCES markers(id),
  props JSONB,
  PRIMARY KEY (player_id, marker_id)
);
GRANT SELECT ON player_markers TO authenticated_user;
GRANT SELECT ON player_markers TO anonymous;

CREATE INDEX IF NOT EXISTS idx_player_markers_player_id ON player_markers(player_id);
CREATE INDEX IF NOT EXISTS idx_player_markers_marker_id ON player_markers(marker_id);

-- 📰 PostGraphile GQL subscription for player marker updates
CREATE OR REPLACE FUNCTION notify_player_changes()
RETURNS TRIGGER AS
$$
DECLARE
  meta_changed BOOLEAN;
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    meta_changed := (OLD.meta IS DISTINCT FROM NEW.meta);
  ELSE
    meta_changed := TRUE;
  END IF;

  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    PERFORM pg_notify(
      'postgraphile:player_updated',
      json_build_object(
        '__node__', json_build_array(
          'players',
          (SELECT NEW.id)
        )
      )::text
    );
  END IF;

  IF meta_changed THEN
    PERFORM pg_notify(
      'postgraphile:marker_updated',
      json_build_object(
        '__node__', json_build_array(
          'markers',
          (SELECT marker_id FROM player_markers WHERE player_id = NEW.id)
        )
      )::text
    );
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
GRANT EXECUTE ON FUNCTION notify_player_changes() TO authenticated_user;

-- 🔫 Trigger for player updates
CREATE OR REPLACE TRIGGER player_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON players
  FOR EACH ROW
  EXECUTE FUNCTION notify_player_changes();

CREATE OR REPLACE FUNCTION notify_player_marker_changes()
  RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    PERFORM pg_notify(
      'postgraphile:marker_updated',
      json_build_object(
        '__node__', json_build_array(
          'markers',
          (SELECT NEW.marker_id)
        )
      )::text
    );
  ELSIF (TG_OP = 'DELETE') THEN
    PERFORM pg_notify(
      'postgraphile:marker_updated',
      json_build_object(
        '__node__', json_build_array(
          'markers',
          (SELECT OLD.marker_id)
        )
      )::text
    );
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION notify_player_marker_changes() IS '@omit';
GRANT EXECUTE ON FUNCTION notify_player_marker_changes() TO authenticated_user;

-- 🔫 Trigger for player marker updates
CREATE OR REPLACE TRIGGER player_marker_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON player_markers
  FOR EACH ROW
  EXECUTE FUNCTION notify_player_marker_changes();

-- 📰 PostGraphile GQL subscription for marker updates
CREATE OR REPLACE FUNCTION notify_marker_changes()
  RETURNS TRIGGER AS
$$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    PERFORM pg_notify(
      'postgraphile:marker_updated',
      json_build_object(
        'operation', 'UPDATE',
        '__node__', json_build_array(
          'markers',
          (SELECT NEW.id)
        )
      )::text
    );
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION notify_marker_changes() IS '@omit';
GRANT EXECUTE ON FUNCTION notify_marker_changes() TO authenticated_user;

-- 🔫 Trigger for markers updates
CREATE OR REPLACE TRIGGER marker_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON markers
  FOR EACH ROW
  EXECUTE FUNCTION notify_marker_changes();

-- 👇 Claim desk
CREATE OR REPLACE FUNCTION claim_desk(desk_marker_id BIGINT)
RETURNS VOID AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM markers WHERE id = desk_marker_id AND type = 'desk') THEN
    RAISE EXCEPTION 'Desk marker not found.';
  END IF;

  IF EXISTS (SELECT 1 FROM player_markers WHERE marker_id = desk_marker_id) THEN
    RAISE EXCEPTION 'Desk already claimed.';
  END IF;

  DELETE FROM player_markers
  WHERE player_id = current_player_id()
  AND marker_id IN (
    SELECT id
    FROM markers
    WHERE type = 'desk'
  );

  INSERT INTO player_markers (player_id, marker_id)
  VALUES (current_player_id(), desk_marker_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION claim_desk(BIGINT) TO authenticated_user;

CREATE OR REPLACE FUNCTION release_desk()
RETURNS VOID AS $$
BEGIN
  DELETE FROM player_markers
  USING markers
  WHERE player_markers.marker_id = markers.id
    AND markers.type = 'desk'
    AND player_markers.player_id = current_player_id();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION release_desk() TO authenticated_user;


-- migrate:down

