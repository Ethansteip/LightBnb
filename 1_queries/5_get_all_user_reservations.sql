SELECT reservations.id AS reservation_id, properties.title AS property_title, properties.cost_per_night, 
reservations.start_date,reservations.end_date,
ROUND(AVG(rating), 2) as average_rating,
properties.number_of_bedrooms AS number_of_bedrooms,
properties.number_of_bathrooms AS number_of_bathrooms,
properties.parking_spaces AS parking_spaces
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 10
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;