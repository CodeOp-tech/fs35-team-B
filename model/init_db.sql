--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists steps;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE `steps`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Description` VARCHAR(255) NOT NULL,
    `Next_1` BIGINT NOT NULL,
    `Next_2` BIGINT NOT NULL,
    `Next_3` BIGINT NOT NULL,
    `Text_1` VARCHAR(255) NOT NULL,
    `Text_2` VARCHAR(255) NOT NULL,
    `Text_3` VARCHAR(255) NOT NULL
);

INSERT INTO `steps` (id, Description, Next_1, Next_2, Next_3, Text_1, Text_2, Text_3) VALUES
(1, 'You have chosen well. You will be painting STEEL!', 2, 0, 0, 'proceed to step 2...', '', ''),
(2, 'Using an orbital sander, sand the entire surface with 120-150 grit sandpaper until smooth and clean of rust and debris.', 3, 0, 0, 'on to step 3!', '', ''),
(3, 'Clean and degrease THOROUGHLY with Denatured Alcohol.', 4, 0, 0, 'go to step 4', '', ''),
(4, 'What do you need to do with this steel?', 5, 6, 7, 'It just needs to go FLAT BLACK, no body work.', 'It needs Matthews Paint but NO body work.', 'It needs body work, or it has been previously painted.'),
(5, 'Paint with Blacksmith brand DTM', 0, 0, 0, 'All done!', '', ''),
(6, 'Prime with Etching Primer', 10, 9, 0, 'Quality Checkpoint! Needs additional repair? Go to step 10.', 'Passes Quality Check? Go to step 9!', ''),
(7, 'Do necessary body work', 8, 0, 0, 'Move to Step 8', '', ''),
(8, 'Prime with Epoxy Primer', 9, 0, 0, 'Move to Step 9', '', ''),
(9, 'Paint with Matthews.', 0, 0, 0, 'All done, good job!', '', ''),
(10, 'Make any needed repairs and spot prime with lacquer or epoxy primer.', 9, 0, 0, 'go to step 9.', '', '');
