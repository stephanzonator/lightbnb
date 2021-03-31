SELECT properties.*, reservations.*, AVG(property_reviews.rating) as average_rating
FROM users
JOIN reservations ON reservations.guest_id = users.id
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE users.id = 1 AND end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date ASC
LIMIT 10