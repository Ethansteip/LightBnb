-- INSERT INTO users (name, email, password)
-- VALUES ('Ethan Steip', 'ethan@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- ('Taylor B', 'taylor@hotmail', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
-- ('Glenny S', 'glenn@aol.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
-- VALUES (1, 1, 'The Suite On Creek', 'A quant little cabin just up from the 4 mile creek', 'www.pexels.com/somephoto', 'www.pexels.com/somephoto', 3000, 2, 1, 2, 'Canada', '100 safe drive.', 'St.Johns', 'Newfoundland', 'H2H4I0', TRUE),
-- (2, 2, 'Dungeon Aparment', 'Stay at your own risk', 'www.pexels.com/somephoto3', 'www.pexels.com/somephoto4', 1000, 0, 1, 1, 'Canada', '100 unsafe drive.', 'Toronto', 'Ontario', 'Z1H8G5', TRUE),
-- (3, 3, 'sunflower cabin', 'The sun will come out tomorrow', 'www.pexels.com/somephoto4', 'www.pexels.com/somephoto5', 5000, 4, 3, 4, 'Canada', '344 Sunn lane.', 'Dunville', 'Ontario', 'R9G2F6', TRUE);

-- INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
-- VALUES (1, '2022-12-15', '2022-12-20', 3, 1),
-- (2, '2022-12-29', '2023-01-20', 1, 2),
-- (3, '2023-04-03', '2023-04-07', 2, 3);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 1, 4, 'We had a fantastic stay! Will definitely come again'),
(2, 1, 2, 3, 5, 'Clean and comfortable. Host was quick to respond :)'),
(3, 3, 3, 2, 1, 'This place is not as well kept as advertised. Beware!');




