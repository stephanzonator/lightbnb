const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log("test email code:", email);
  /*
  // // ORIGINAL JSON CODE
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // console.log("FORMAT TEST: user JSON", user)
  // return Promise.resolve(user);
  */

  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  return Promise.resolve(pool.query(queryString, [email])
    .then(res => {
      // console.log('success?', res.rows[0]);
      return res.rows[0];
    })
    .catch(res => {
      console.log("FATAL ERROR: get user with email", res)
    })
    );
    
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // // ORIGINAL JSON CODE
  // return Promise.resolve(users[id]);

  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1;
  `;

  return Promise.resolve(pool.query(queryString, [id])
    .then(res => res.rows[0]));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  console.log("******USER CODE******", user);
  // // ORIGINAL JSON CODE
  /*
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  */

  const queryString = `
    INSERT INTO users (
      name, email, password
    ) VALUES (
      $1, $2, $3
    )
    RETURNING *;
  `;

  const values = [user.name, user.email, user.password]

  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      console.log(res.rows);
      //res.rows
    })
    .catch(res => {
      console.log("FATAL ERROR OCCURED, sorry about that", res)
    })
    );
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  //ORIGINAL JSON CODE
  // return getAllProperties(null, 2);
  const queryString = `
    SELECT properties.*, reservations.*, AVG(property_reviews.rating) as average_rating
    FROM users
    JOIN reservations ON reservations.guest_id = users.id
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON reservations.property_id = property_reviews.property_id
    WHERE users.id = $1 AND end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY start_date ASC
    LIMIT 10
  `;
  const values = [guest_id]
  return Promise.resolve(pool.query(queryString, values)
    .then(res => {
      // console.log(res.rows);
      return res.rows;
    })
    .catch(res => {
      console.log("FATAL ERROR OCCURED, sorry about that", res)
    })
    );
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // ORIGINAL JSON CODE
  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
  
  const queryString = `
    SELECT *
    FROM properties
    LIMIT $1;
  `;

  return Promise.resolve(pool.query(queryString, [limit])
    .then(res => res.rows));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;