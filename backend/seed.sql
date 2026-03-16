-- Sample data for MotivateMate
-- Run with: psql -U motivatemate_user -d motivatemate_dev -f seed.sql

-- Clear existing data (optional - be careful!)
-- TRUNCATE users, tasks, pets, shop_items, achievements CASCADE;

-- Sample users
INSERT INTO users (username, email, password_hash) VALUES 
('alice', 'alice@example.com', 'hash123'),
('bob', 'bob@example.com', 'hash456'),
('charlie', 'charlie@example.com', 'hash789');

-- Sample pets (one per user)
INSERT INTO pets (user_id, name, type, hunger, happiness, energy) VALUES 
(1, 'Whiskers', 'cat', 60, 80, 70),
(2, 'Buddy', 'dog', 40, 90, 85),
(3, 'Hoot', 'owl', 30, 60, 50);

-- Sample tasks
INSERT INTO tasks (user_id, title, priority, difficulty, due_date, points_worth) VALUES 
(1, 'Complete project proposal', 'high', 'hard', '2026-03-20', 50),
(1, 'Buy groceries', 'medium', 'easy', '2026-03-17', 10),
(2, 'Study for exam', 'urgent', 'hard', '2026-03-15', 75),
(3, 'Call mom', 'medium', 'easy', '2026-03-16', 15);

-- Sample shop items
INSERT INTO shop_items (name, description, item_type, effect_type, effect_value, cost_points, rarity) VALUES 
('Premium Pet Food', 'Delicious nutritious meal', 'food', 'hunger', 30, 20, 'common'),
('Bouncy Ball', 'Hours of fun!', 'toy', 'happiness', 25, 35, 'uncommon'),
('Magic Hat', 'Your pet looks magical', 'accessory', 'cosmetic', 0, 100, 'rare'),
('Energy Treat', 'Quick energy boost', 'food', 'energy', 40, 50, 'rare');

-- Sample achievements
INSERT INTO achievements (name, description, criteria_type, criteria_value, reward_points) VALUES 
('First Steps', 'Complete your first task', 'tasks_completed', 1, 10),
('Task Master', 'Complete 10 tasks', 'tasks_completed', 10, 50),
('Pet Lover', 'Reach pet level 5', 'pet_level', 5, 75);