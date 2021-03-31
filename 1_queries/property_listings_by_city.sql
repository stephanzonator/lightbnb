SELECT properties.id, properties.title, cost_per_night, AVG(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE city = 'Vancouver'
GROUP BY properties.id, properties.title, cost_per_night
HAVING AVG(property_reviews.rating) > 4
ORDER BY cost_per_night ASC
LIMIT 10