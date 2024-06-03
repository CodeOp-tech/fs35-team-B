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


INSERT INTO users (username, password, email) VALUES 
('admin', 'adminpassword', 'admin@example.com'),


-- Update admin user to have id=0
UPDATE users SET id=0 WHERE username='admin';

-- Insert categories
INSERT INTO categories (type, user_id) VALUES 
('Javascript', 0),
('Front-End', 0),
('Back-End', 0);

-- Insert resources
INSERT INTO resources (link_url, vid_url, doc, img, notes, category_id, user_id) VALUES 
-- Initial resources
('https://developer.mozilla.org/en-US/docs/Learn/JavaScript', '', '', '', 'MDN Web Docs - Comprehensive JavaScript learning resource', 1, 0),
('https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript', '', '', '', 'The Odin Project - Full Stack JavaScript course', 1, 0),
('https://vuejs.org/', '', '', '', 'Vue.js - Progressive JavaScript Framework', 2, 0),
-- New resources
('https://www.w3schools.com/css/default.asp', '', '', '', 'W3Schools - CSS', 2, 0),
('https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', '', '', '', 'The Odin Project - Node.js', 3, 0),
('https://dev.mysql.com/doc/refman/8.4/en/', '', '', '', 'MySQL Documentation', 3, 0),
('https://youtu.be/Sh6lK57Cuk4?si=xgssyNkDTlQuSF1D', 'https://youtu.be/Sh6lK57Cuk4?si=xgssyNkDTlQuSF1D', '', '', 'JavaScript Tutorial for Beginners - FreeCodeCamp', 1, 0),
('https://youtu.be/lkIFF4maKMU?si=8PGcHcI5Wngxd-C9', 'https://youtu.be/lkIFF4maKMU?si=8PGcHcI5Wngxd-C9', '', '', 'JavaScript Crash Course For Beginners - Traversy Media', 1, 0),
('https://youtu.be/Tn6-PIqc4UM?si=RC8-aY47-T5RqDFT', 'https://youtu.be/Tn6-PIqc4UM?si=RC8-aY47-T5RqDFT', '', '', 'JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour', 1, 0),
('https://youtu.be/-qfEOE4vtxE?si=3f8J0VxWugvt0LTX', 'https://youtu.be/-qfEOE4vtxE?si=3f8J0VxWugvt0LTX', '', '', 'JavaScript ES6 Tutorial', 1, 0),
('https://youtu.be/Cz3WcZLRaWc?si=QF9nlRKskgx2WR15', 'https://youtu.be/Cz3WcZLRaWc?si=QF9nlRKskgx2WR15', '', '', 'JavaScript Full Course', 1, 0),
('https://youtu.be/ENrzD9HAZK4?si=ZyNNwdqz8HevAR46', 'https://youtu.be/ENrzD9HAZK4?si=ZyNNwdqz8HevAR46', '', '', 'Modern JavaScript Tutorial', 1, 0);    

