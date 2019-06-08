### Schema

DROP DATABASE IF EXISTS voyager_db;
CREATE DATABASE voyager_db;
USE voyager_db;

CREATE TABLE voyager(
	id int NOT NULL AUTO_INCREMENT,
	astronaut_name varchar(50) NOT NULL,
    space_craft varchar(50) NOT NULL,
    trip_distance int(50) NOT NULL,
	return_trip BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

