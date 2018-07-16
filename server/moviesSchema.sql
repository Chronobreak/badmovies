-- SET UP SCHEMA HERE

CREATE DATABASE badmovies

USE movies

CREATE TABLE favorites (
  id int NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  releaseyear int NOT NULL,
  rating FLOAT NOT NULL,
  PRIMARY KEY ('id')
)