/*Certaine requetes sont faites ,histoire de revoir quelques commande SQL*/



-- CREATION TABLE USERS
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `user_email` varchar(150) NOT NULL DEFAULT '',
  `user_password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `active` tinyint(1) DEFAULT '1',
  `user_description` varchar(255),
  PRIMARY KEY (`user_id`),
  UNIQUE (`user_email`)
);

-- 