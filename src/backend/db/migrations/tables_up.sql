-- create table for census data with columns for id (self generated), zipcode (unique), population (int), income (int), age (int), average home value (int)
CREATE TABLE census_data (
  id SERIAL PRIMARY KEY,
  zipcode INTEGER UNIQUE,
  population INTEGER,
  income INTEGER,
  age INTEGER,
  average_home_value INTEGER
);
