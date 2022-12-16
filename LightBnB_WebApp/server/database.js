const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  password: 'labber',
  host: 'localhost',
  user: 'labber',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  return pool
    .query((`
    SELECT id, name, email, password
    FROM users
    WHERE email = $1
    `),
    [email])
    .then(res => {
      if (res.rows[0]) {
        //console.log(res.rows[0]);
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.error('query error', err.stack);
    });
};

console.log(getUserWithEmail('ethan@gmail.com'));

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query((`
    SELECT id, name, email
    FROM users
    WHERE id = $1`),
    [id])
    .then(res => {
      if (res.rows[0]) {
        //console.log(res.rows[0]);
        return res.rows;
      } else {
        console.log("Sorry, we we're unable to find a user with that id");
        return null;
      }
    })
    .catch(err => {
      console.error('query error', err.stack);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const userToAdd = {
  name: 'Michael Steip',
  email: 'michael@aol.com',
  password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
};

const addUser =  function(user) {
  
  return pool
    .query((`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`),
    [user.name, user.email, user.password])
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(err => {
      console.error('query error', err.stack);
    });
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  
  return pool
    .query((`SELECT reservations.id AS reservation_id, properties.title AS title, properties.cost_per_night, 
    reservations.start_date,reservations.end_date,
    properties.thumbnail_photo_url AS thumbnail_photo_url,
    ROUND(AVG(rating), 2) as average_rating,
    properties.number_of_bedrooms AS number_of_bedrooms,
    properties.number_of_bathrooms AS number_of_bathrooms,
    properties.parking_spaces AS parking_spaces
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`), [guest_id, limit])
    .then(res => {
      console.log("Reservations: ", res.rows);
      return res.rows;
    })
    .catch(err => {
      console.log("Query Error: ", err.stack);
    });
};

//getAllReservations(10);


exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  return pool
    .query((`SELECT * FROM properties LIMIT $1`), [limit])
    .then((result) => {
      //console.log(result.rows);
      return result.rows;
    })
    .catch(err => console.error('query error', err.stack));
};
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
};
exports.addProperty = addProperty;
