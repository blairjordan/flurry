-- migrate:up

CREATE TABLE IF NOT EXISTS pets (
  id BIGSERIAL PRIMARY KEY,
  sprite_index INTEGER UNIQUE NOT NULL
);

GRANT SELECT ON pets TO anonymous;
GRANT SELECT ON pets TO authenticated_user;

CREATE TABLE IF NOT EXISTS player_pets (
  player_id BIGINT REFERENCES players(id) ON DELETE CASCADE,
  pet_id BIGINT REFERENCES pets(id) ON DELETE CASCADE,
  name TEXT,
  level INTEGER DEFAULT 1 NOT NULL,
  xp INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (player_id, pet_id)
);

CREATE INDEX IF NOT EXISTS idx_player_pets_player_id ON player_pets(player_id);
CREATE INDEX IF NOT EXISTS idx_player_pets_pet_id ON player_pets(pet_id);

GRANT SELECT ON player_pets TO anonymous;
GRANT SELECT ON player_pets TO authenticated_user;

INSERT INTO pets (sprite_index) VALUES (0);
INSERT INTO pets (sprite_index) VALUES (1);

-- Give first pet to all players
INSERT INTO player_pets (player_id, pet_id, name)
SELECT p.id AS player_id, (SELECT id FROM pets ORDER BY id LIMIT 1) AS pet_id, 'Pet' AS name
FROM players p;

-- migrate:down
