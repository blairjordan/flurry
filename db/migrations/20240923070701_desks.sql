-- migrate:up

-- 🖇️ Add markers for desks (including chairs)
INSERT INTO markers (type, props)
VALUES
('desk', '{"position": {"topLeft": {"x": 3,  "y": 10 }, "bottomRight": {"x": 9,  "y": 11 }, "chair": {"x": 6,  "y": 12 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 12, "y": 10 }, "bottomRight": {"x": 18, "y": 11 }, "chair": {"x": 15, "y": 12 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 21, "y": 10 }, "bottomRight": {"x": 27, "y": 11 }, "chair": {"x": 24, "y": 12 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 3,  "y": 15 }, "bottomRight": {"x": 9,  "y": 16 }, "chair": {"x": 6,  "y": 17 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 12, "y": 15 }, "bottomRight": {"x": 18, "y": 16 }, "chair": {"x": 15, "y": 17 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 21, "y": 15 }, "bottomRight": {"x": 27, "y": 16 }, "chair": {"x": 24, "y": 17 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 3,  "y": 20 }, "bottomRight": {"x": 9,  "y": 21 }, "chair": {"x": 6,  "y": 22 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 12, "y": 20 }, "bottomRight": {"x": 18, "y": 21 }, "chair": {"x": 15, "y": 22 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 21, "y": 20 }, "bottomRight": {"x": 27, "y": 21 }, "chair": {"x": 24, "y": 22 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 3,  "y": 25 }, "bottomRight": {"x": 9,  "y": 26 }, "chair": {"x": 6,  "y": 27 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 12, "y": 25 }, "bottomRight": {"x": 18, "y": 26 }, "chair": {"x": 15, "y": 27 }}}'::jsonb),
('desk', '{"position": {"topLeft": {"x": 21, "y": 25 }, "bottomRight": {"x": 27, "y": 26 }, "chair": {"x": 24, "y": 27 }}}'::jsonb)
;

-- migrate:down

