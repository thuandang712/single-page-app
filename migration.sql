DROP DATABASE IF EXISTS travel;
CREATE DATABASE travel;
\c travel;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS countries;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    age INTEGER
);

CREATE TABLE countries (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(255),
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
);