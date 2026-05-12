-- migrate:up

-- 📰 Feeds table to store feed information
CREATE TABLE IF NOT EXISTS feeds (
  id BIGSERIAL PRIMARY KEY,
  player_id BIGINT REFERENCES players(id) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (player_id, name)
);
COMMENT ON TABLE feeds IS '@omit create,update,delete';

-- Create unique index for slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_feeds_slug ON feeds(slug);
CREATE INDEX IF NOT EXISTS idx_feeds_player_id ON feeds(player_id);
CREATE INDEX IF NOT EXISTS idx_feeds_is_public ON feeds(is_public);

-- Function to generate a unique slug
CREATE OR REPLACE FUNCTION generate_unique_feed_slug(base_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(base_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(gen_random_uuid()::text, 1, 6);
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION generate_unique_feed_slug(TEXT) IS '@omit';

-- 📝 Feed items table to store content
CREATE TABLE IF NOT EXISTS feed_items (
  id BIGSERIAL PRIMARY KEY,
  feed_id BIGINT REFERENCES feeds(id) NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
COMMENT ON TABLE feed_items IS '@omit create,update,delete';

CREATE INDEX IF NOT EXISTS idx_feed_items_feed_id ON feed_items(feed_id);

-- 🔔 Player subscriptions to track feed subscriptions
CREATE TABLE IF NOT EXISTS player_subscriptions (
  player_id BIGINT REFERENCES players(id),
  feed_id BIGINT REFERENCES feeds(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (player_id, feed_id)
);
COMMENT ON TABLE player_subscriptions IS '@omit update';

CREATE INDEX IF NOT EXISTS idx_player_subscriptions_player_id ON player_subscriptions(player_id);
CREATE INDEX IF NOT EXISTS idx_player_subscriptions_feed_id ON player_subscriptions(feed_id);

-- Grant appropriate permissions
GRANT SELECT ON feeds TO authenticated_user, anonymous;
GRANT INSERT ON feeds TO authenticated_user;
GRANT SELECT ON feed_items TO authenticated_user, anonymous;
GRANT INSERT ON feed_items TO authenticated_user;
GRANT USAGE ON SEQUENCE feed_items_id_seq TO authenticated_user;
GRANT USAGE ON SEQUENCE feeds_id_seq TO authenticated_user;
GRANT SELECT, INSERT, DELETE ON player_subscriptions TO authenticated_user;

-- Enable RLS on all tables
ALTER TABLE feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_subscriptions ENABLE ROW LEVEL SECURITY;

-- 👀 Players can view their own feeds or public feeds

CREATE POLICY feeds_select ON feeds
  FOR SELECT TO authenticated_user
  USING (
    player_id = current_player_id()
    OR is_public = TRUE
    OR EXISTS (
      SELECT 1 FROM player_subscriptions
      WHERE player_subscriptions.feed_id = feeds.id
      AND player_subscriptions.player_id = current_player_id()
    )
  );

-- ✍️ Only feed owner can insert
CREATE POLICY feeds_insert ON feeds
  FOR INSERT TO authenticated_user
  WITH CHECK (player_id = current_player_id());

-- 👀 Players can view feed items for feeds they are subscribed to, own, or are public
CREATE POLICY feed_items_select ON feed_items
  FOR SELECT TO authenticated_user
  USING (
    EXISTS (
      SELECT 1 FROM player_subscriptions
      WHERE player_subscriptions.feed_id = feed_items.feed_id
      AND player_subscriptions.player_id = current_player_id()
    )
    OR
    EXISTS (
      SELECT 1 FROM feeds
      WHERE feeds.id = feed_items.feed_id
      AND (feeds.player_id = current_player_id() OR feeds.is_public = TRUE)
    )
  );

-- ✍️ Only feed owner can insert items
CREATE POLICY feed_items_insert ON feed_items
  FOR INSERT TO authenticated_user
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM feeds
      WHERE feeds.id = feed_items.feed_id
      AND feeds.player_id = current_player_id()
    )
  );

-- 👀 Users can only see their own subscriptions
CREATE POLICY player_subscriptions_select ON player_subscriptions
  FOR SELECT TO authenticated_user
  USING (player_id = current_player_id());

-- ✍️ Users can only subscribe themselves
CREATE POLICY player_subscriptions_insert ON player_subscriptions
  FOR INSERT TO authenticated_user
  WITH CHECK (player_id = current_player_id());

-- 🗑️ Users can only delete their own subscriptions
CREATE POLICY player_subscriptions_delete ON player_subscriptions
  FOR DELETE TO authenticated_user
  USING (player_id = current_player_id());

-- Helper function to create a new feed
CREATE OR REPLACE FUNCTION create_feed(feed_name TEXT, is_public BOOLEAN DEFAULT FALSE)
RETURNS feeds AS $$
DECLARE
  new_feed feeds;
BEGIN
  INSERT INTO feeds (player_id, name, slug, is_public)
  VALUES (
    current_player_id(),
    feed_name,
    generate_unique_feed_slug(feed_name),
    is_public
  )
  RETURNING * INTO new_feed;

  RETURN new_feed;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION create_feed(TEXT, BOOLEAN) IS 'Create a new feed for the current player, optionally making it public';

-- Function to create a feed item
CREATE OR REPLACE FUNCTION create_feed_item(feed_id BIGINT, item_content JSONB)
RETURNS feed_items AS $$
DECLARE
  new_item feed_items;
BEGIN
  -- Check if the user owns the feed
  IF NOT EXISTS (
    SELECT 1 FROM feeds
    WHERE feeds.id = feed_id
    AND feeds.player_id = current_player_id()
  ) THEN
    RAISE EXCEPTION 'You can only create items for feeds you own';
  END IF;

  -- Create the feed item
  INSERT INTO feed_items (feed_id, content)
  VALUES (feed_id, item_content)
  RETURNING * INTO new_item;

  RETURN new_item;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION create_feed_item(BIGINT, JSONB) IS 'Create a new item in a feed owned by the current player';

-- Function to subscribe to a feed by slug
CREATE OR REPLACE FUNCTION subscribe_feed(feed_slug TEXT)
RETURNS player_subscriptions AS $$
DECLARE
  target_feed_id BIGINT;
  new_subscription player_subscriptions;
BEGIN
  -- Find the feed by slug
  SELECT id INTO target_feed_id FROM feeds WHERE slug = feed_slug;
  
  -- If feed doesn't exist, raise an error
  IF target_feed_id IS NULL THEN
    RAISE EXCEPTION 'Feed with slug "%" not found', feed_slug;
  END IF;
  
  -- Create the subscription
  INSERT INTO player_subscriptions (player_id, feed_id)
  VALUES (current_player_id(), target_feed_id)
  ON CONFLICT (player_id, feed_id) DO NOTHING
  RETURNING * INTO new_subscription;
  
  -- If subscription already existed, retrieve it
  IF new_subscription IS NULL THEN
    SELECT * INTO new_subscription 
    FROM player_subscriptions 
    WHERE player_id = current_player_id() AND feed_id = target_feed_id;
  END IF;
  
  RETURN new_subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMENT ON FUNCTION subscribe_feed(TEXT) IS 'Subscribe the current player to a feed by its slug';

GRANT EXECUTE ON FUNCTION create_feed(TEXT, BOOLEAN) TO authenticated_user;
GRANT EXECUTE ON FUNCTION create_feed_item(BIGINT, JSONB) TO authenticated_user;
GRANT EXECUTE ON FUNCTION subscribe_feed(TEXT) TO authenticated_user;

-- migrate:down
