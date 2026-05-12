-- migrate:up

CREATE OR REPLACE FUNCTION notify_new_player()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM graphile_worker.add_job(
    'send_email',
    json_build_object(
      'subject', 'New Player Registered',
      'content', format('A new player has registered: %s', NEW.username)
    ),
    queue_name := 'notifications'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION notify_new_player() IS '@omit';

CREATE OR REPLACE TRIGGER player_registered_notification_trigger
AFTER INSERT ON players
FOR EACH ROW
EXECUTE FUNCTION notify_new_player();

-- migrate:down

