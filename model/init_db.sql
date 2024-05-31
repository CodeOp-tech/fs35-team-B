DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;


CREATE TABLE `resources`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `link_url` VARCHAR(255) NOT NULL,
    `vid_url` VARCHAR(255) NOT NULL,
    `doc` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `notes` LONGTEXT NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `resources` ADD CONSTRAINT `resources_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`);
ALTER TABLE
    `resources` ADD CONSTRAINT `resources_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `categories` ADD CONSTRAINT `categories_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);