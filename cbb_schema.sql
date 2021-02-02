CREATE DATABASE IF NOT EXISTS cbb;
DROP SCHEMA IF EXISTS cbb;
CREATE SCHEMA cbb COLLATE = utf8_general_ci;
USE cbb;


CREATE TABLE users (
  ID_user INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  age INT(3) NOT NULL,
  height INT(3) NOT NULL,
  sex ENUM('MAN', 'WOMAN'),
  interest ENUM('MEN', 'WOMEN', 'BOTH'),
  eyes_color varchar(50),
  hair_color varchar(50),
  PRIMARY KEY (ID_user)
);


INSERT INTO users
VALUES (
        default,
        'Zbigniew',
        'Korwinowski',
		'Czechowice-Dziedzice',
        21,
        170,
		'MAN',
		'WOMEN',
		'green',
		'dark'
       );

INSERT INTO users
VALUES (
        default,
        'Magdalena',
        'Kawa',
		'Cholerzyn',
        23,
        160,
		'WOMAN',
		'MEN',
		'blue',
		'blonde'
       );

INSERT INTO users
VALUES (
        default,
        'Antoni',
        'Piotrkowski',
		'Krakow',
        30,
        150,
		'MAN',
		'WOMEN',
		'bronze',
		'blonde'
       );

CREATE TABLE  questions(
      ID_question INT (11) UNSIGNED NOT NULL AUTO_INCREMENT,
      text varchar(100) NOT NULL,
      answer ENUM('TAK', 'NIE'),
      PRIMARY KEY (ID_question)
);


DROP USER 'cbb'@'localhost';
FLUSH PRIVILEGES;
CREATE USER 'cbb'@'localhost' IDENTIFIED BY 'cbb';
GRANT ALL PRIVILEGES ON cbb.* TO cbb@localhost;
FLUSH PRIVILEGES;

