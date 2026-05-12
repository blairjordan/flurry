-- migrate:up

CREATE OR REPLACE FUNCTION players_api_secret(players players)
RETURNS TEXT AS $$
DECLARE
  secret TEXT;
BEGIN
  SELECT md5(concat(p.provider_id, current_setting('custom.server_secret_key')))
  INTO secret
  FROM players p
  WHERE p.id = players.id
    AND p.id = current_player_id();

  RETURN secret;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION players_api_secret(players) TO authenticated_user;

-- migrate:down

