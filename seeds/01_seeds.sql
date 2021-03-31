INSERT INTO users (
  name, email, password
) VALUES (
  'firstamia lastnamia' , 'mail@mail.com' , '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
), (
  'betsy fakename','mail@fakemail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
), (
  'bessie alsofake','fakemail@fake.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
);

INSERT INTO properties (
  title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code
) VALUES (
  'Cool house',
  'a very cool house',
  'url1',
  'url2',
  3,
  4,
  5,
  6,
  'Cambodia',
  'Street name',
  'City name',
  'Eldin province',
  'HOHOHO'
), (
  'Cooler house',
  'a very uncool house',
  'url1',
  'url2',
  3,
  4,
  8,
  10,
  'Canadia',
  'Street name2',
  'Townsville',
  'Faron province',
  'HOHOHO'
), (
  'Coolest house',
  'a very very cool house',
  'url1',
  'url2',
  10,
  2,
  7,
  1000,
  'Norwegia',
  'Street name3',
  'Mekacity',
  'Lanayru province',
  'HOHOHO'
);

INSERT INTO reservations (
  start_date, end_date
) VALUES (
  NOW() , NOW() 
), (
  NOW() , NOW() 
), (
  NOW() , NOW() 
);

INSERT INTO property_reviews (
  rating, message
) VALUES (
  5, 'text'
), (
  4, 'text'
), (
  3, 'textt'
)
