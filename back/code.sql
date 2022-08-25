/*Certaine requetes sont faites ,histoire de revoir quelques commande SQL*/



-- CREATION TABLE USERS
CREATE TABLE IF NOT EXISTS `users`(
    `user_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    `user_email` VARCHAR(100) UNIQUE NOT NULL,
    `user_pseudo`VARCHAR(30),
    `user_avatar`VARCHAR(250),
    `user_password`VARCHAR(250) NOT NULL,
    `user_admin` BOOLEAN DEFAULT 0,
    `user_bio`VARCHAR(250),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);
-- Pour décrire la table
DESCRIBE t_users;

ALTER TABLE t_users
ADD PRIMARY KEY (`user_id`);

ALTER TABLE t_users
ADD UNIQUE(`user_email`,`user_pseudo`);
-- AJOUTER DEAFAULT A UNE COLUMN
ALTER TABLE t_users ALTER COLUMN admin  SET DEFAULT 0;

-- //CHANGER NOM CHAMP ou ATTRIBUT COLUMN
ALTER TABLE t_users
CHANGE bio user_bio VARCHAR(100) ;
ALTER TABLE t_users
CHANGE admin user_admin BOOLEAN DEFAULT 0 ;

ALTER TABLE t_users
CHANGE user_bio user_bio VARCHAR(100) NOT NULL ;
