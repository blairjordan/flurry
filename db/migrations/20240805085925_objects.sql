-- migrate:up

-- 📦 Some items to purchase
INSERT INTO items (item_key, name, props, price)
VALUES (
  'rubber_duck',
  'Rubber Duck',
  '{
    "sprites": {
      "composition": [
        [122]
      ]
    }
  }'::jsonb,
  5.00
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'robot',
  'Robot',
  '{
    "sprites": {
      "composition": [
        [124],
        [144]
      ]
    }
  }'::jsonb,
  15.00
);


INSERT INTO items (item_key, name, props, price)
VALUES (
  'trophy',
  'Trophy',
  '{
    "sprites": {
      "composition": [
        [123]
      ]
    }
  }'::jsonb,
  20
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'globe',
  'Globe',
  '{
    "sprites": {
      "composition": [
        [126],
        [146]
      ]
    }
  }'::jsonb,
  10
);


INSERT INTO items (item_key, name, props, price)
VALUES (
  'big_cake',
  'Big Cake',
  '{
    "sprites": {
      "composition": [
        [127],
        [147]
      ]
    }
  }'::jsonb,
  40
);


INSERT INTO items (item_key, name, props, price)
VALUES (
  'guitar',
  'Guitar',
  '{
    "sprites": {
      "composition": [
        [128],
        [148]
      ]
    }
  }'::jsonb,
  75
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'big_pot_plant',
  'Big Pot Plant',
  '{
    "sprites": {
      "composition": [
        [66],
        [86]
      ]
    }
  }'::jsonb,
  55
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'medium_pot_plant',
  'Medium Pot Plant',
  '{
    "sprites": {
      "composition": [
        [67],
        [87]
      ]
    }
  }'::jsonb,
  35
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'small_pot_plant',
  'small Pot Plant',
  '{
    "sprites": {
      "composition": [
        [85]
      ]
    }
  }'::jsonb,
  10
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'monitor_left',
  'Computer Monitor (Left)',
  '{
    "sprites": {
      "composition": [
        [6]
      ]
    }
  }'::jsonb,
  50
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'monitor_middle',
  'Computer Monitor (Middle)',
  '{
    "sprites": {
      "composition": [
        [7]
      ]
    }
  }'::jsonb,
  50
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'monitor_right',
  'Computer Monitor (Right)',
  '{
    "sprites": {
      "composition": [
        [8]
      ]
    }
  }'::jsonb,
  50
);

INSERT INTO items (item_key, name, props, price)
VALUES (
  'keyboard_mouse',
  'Keyboard and Mouse',
  '{
    "sprites": {
      "composition": [
        [46]
      ]
    }
  }'::jsonb,
  20
);

-- migrate:down

