-- migrate:up

REVOKE EXECUTE ON FUNCTION players_api_secret(players) FROM authenticated_user;
COMMENT ON FUNCTION players_api_secret(players) IS '@omit';

-- migrate:down

COMMENT ON FUNCTION players_api_secret(players) IS NULL;
GRANT EXECUTE ON FUNCTION players_api_secret(players) TO authenticated_user;
