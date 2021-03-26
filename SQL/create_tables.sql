CREATE TABLE users (
    `id` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(128), 
    `email` VARCHAR(256), 
    `password` VARCHAR(512),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
    );

CREATE TABLE characters (
    `mnk` VARCHAR(20) NOT NULL PRIMARY KEY,
    `user_id` INT(10),
    `name` VARCHAR(128), 
    `expiration_date` DATE,
    `hash` VARCHAR(512),
    KEY `FK_character_user` (`user_id`),
    CONSTRAINT `FK_character_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
    );

CREATE TABLE orders (
    `id` VARCHAR(64) NOT NULL PRIMARY KEY,
    `mnk` VARCHAR(20) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    days INT(10) NOT NULL,
    `full_price` FLOAT(8,2) NOT NULL,
    `price` FLOAT(8,2) NOT NULL,
    `captured_price` FLOAT(8,2),
    `transaction_id` VARCHAR(64),
    `payer_name` VARCHAR(128), 
    `payer_email` VARCHAR(256), 
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `FK_order_character` (`mnk`),
    CONSTRAINT `FK_order_character` FOREIGN KEY (`mnk`) REFERENCES `characters`(`mnk`)
    );


CREATE TABLE trials (
    `id` INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `mnk` VARCHAR(20) NOT NULL,
    `email` VARCHAR(128),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `FK_trial_character` (`mnk`),
    CONSTRAINT `FK_trial_character` FOREIGN KEY (`mnk`) REFERENCES `characters`(`mnk`)
    );

