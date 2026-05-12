-- migrate:up

DO $$
BEGIN

  ALTER TABLE players_private DISABLE TRIGGER update_players_private_trigger;

  -- 🧍 Create initial players
  WITH inserted_player AS (
    INSERT INTO players (username, meta, position, provider_id)
    VALUES (
      'blair',
      '{"characterIndex": 0, "role": "Managing Consultant", "company": "Dev Mode", "status": {"state": "Working on surrogate_fns@v1.4.8.sql:20:15", "details": "In deploy - 0 problems found", "instance": true, "startTimestamp": 1728716057525}, "deskSpriteIndexes": [124, 0, 6, 7, 8, 0, 126, 144, 0, 122, 46, 0, 0, 146]}',
      '{"x": 12, "y": 6, "direction": "down", "state": "standing" }',
      '491a553c-20e1-70ba-7cab-afbd95e730df'
    )
    ON CONFLICT (provider_id) DO NOTHING
    RETURNING id
  )
  INSERT INTO players_private (player_id, ai_prompt, assistant_id)
  SELECT id, 
    'You are the owner of a software development consultancy called Dev Mode - A company which helps businesses create data-driven applications designed to leverage AI technologies. You also created the environment which are interacting in right now. Players can visit https://devmode.digital to find out more.',
    'asst_51ZV6AtX0VydOul5ktCkfE1Z'
  FROM inserted_player;

  WITH inserted_player AS (
    INSERT INTO players (username, meta, position, provider_id)
    VALUES (
      'billy',
      '{"characterIndex": 0, "role": "Senior Software Engineer", "company": "Company X", "deskSpriteIndexes": [0, 0, 0, 7, 8, 0, 128, 0, 0, 0, 46, 0, 0, 148]}',
      '{"x": 13, "y": 6, "direction": "down", "state": "standing" }',
      '49aa45dc-a0b1-7027-275f-4d4baf464b68'
    )
    ON CONFLICT (provider_id) DO NOTHING
    RETURNING id
  )
  INSERT INTO players_private (player_id, ai_prompt, assistant_id)
  SELECT id, 
    'You are a cool dude. Too cool for this office indeed. The guitar on your desk is a testament to this, and everybody should be aware of its presence and how rock''n''roll you are. Lest they are unaware - Remind them. Occasionally you develop software, but only to fund your rock''n''roll lifestyle.',
    'asst_yyodbOCtQIDqIBtSmJr9cjA7'
  FROM inserted_player;

  WITH inserted_player AS (
    INSERT INTO players (username, meta, position, provider_id)
    VALUES (
      'sally',
      '{"characterIndex": 0, "role": "Senior AI Engineer", "company": "Company Y", "fullName": "Sally", "deskSpriteIndexes": [85, 67, 0, 7, 127, 123, 66, 0, 87, 0, 46, 147, 0, 86]}',
      '{"x": 13, "y": 5, "direction": "down", "state": "standing" }',
      'c93ae5fc-c041-707f-b71d-a84998204ed0'
    )
    ON CONFLICT (provider_id) DO NOTHING
    RETURNING id
  )
  INSERT INTO players_private (player_id, ai_prompt, assistant_id)
  SELECT id, 
    'You work for ChatGPT and you''re a senior AI engineer. Your work is top secret. You love the plants on your desk, as well as your big frosted cake. It''s your birthday. The golden trophy on your desk is for being "AI boffin of the year".',
    'asst_iBz1zSNJPi9ziBvYxuVKgnI5'
  FROM inserted_player;

  ALTER TABLE players_private ENABLE TRIGGER update_players_private_trigger;

END $$;

-- Create any missing players in players_private
INSERT INTO players_private (player_id)
SELECT id
FROM players players_public
WHERE NOT EXISTS (
  SELECT 1
  FROM players_private
  WHERE player_id = players_public.id
);

-- Backdate players so they appear offline
UPDATE players
SET updated_at = NOW() - INTERVAL '10 minutes';

-- 🖥️ Assign players to desks
INSERT INTO player_markers (player_id, marker_id)
SELECT id, 1
FROM players p
WHERE p.username = 'blair'
UNION ALL
SELECT id, 2
FROM players p
WHERE p.username = 'billy'
UNION ALL
SELECT id, 4
FROM players p
WHERE p.username = 'sally';

-- migrate:down

