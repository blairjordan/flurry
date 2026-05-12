-- migrate:up

ALTER TABLE players ADD COLUMN wallets JSONB DEFAULT '{}';
GRANT UPDATE (wallets) ON players TO authenticated_user;

-- migrate:down

