-- migrate:up

CREATE OR REPLACE FUNCTION get_player_agent_details(player_id BIGINT)
RETURNS TABLE (
  player_name TEXT,
  player_role TEXT,
  player_company TEXT,
  player_position_state TEXT,
  desk_items TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH player_details AS (
    SELECT
      COALESCE(meta->>'fullName', username) AS player_name,
      meta->>'role' AS meta_role,
      meta->>'company' AS meta_company,
      position->>'state' AS position_state,
      jsonb_array_elements_text(meta->'deskSpriteIndexes') AS sprite_index
    FROM players
    WHERE id = player_id
  ),
  player_items AS (
    SELECT
      pd.player_name,
      pd.meta_role as player_role,
      pd.meta_company as player_company,
      pd.position_state as player_position_state,
      i.name AS item_name
    FROM player_details pd
    LEFT JOIN items i ON i.props->'sprites'->'composition' @> jsonb_build_array(jsonb_build_array(pd.sprite_index::int))
  )
  SELECT
    pi.player_name,
    pi.player_role,
    pi.player_company,
    pi.player_position_state,
    string_agg(DISTINCT pi.item_name, ', ' ORDER BY pi.item_name) AS desk_items
  FROM player_items pi
  GROUP BY pi.player_name, pi.player_role, pi.player_company, pi.player_position_state;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION get_player_agent_details(player_id BIGINT) IS '@omit';

-- migrate:down

