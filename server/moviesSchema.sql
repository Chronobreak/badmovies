-- SET UP SCHEMA HERE

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
  id int NOT NULL,
  poster_path varchar(255),
  original_title varchar(255) NOT NULL,
  release_date varchar(11) NOT NULL,
  vote_average FLOAT NOT NULL,
  PRIMARY KEY (`id`)
)