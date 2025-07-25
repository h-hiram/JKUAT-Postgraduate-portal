--added so that we can track the academic level of students
--this will help in generating reports based on academic levels
ALTER TABLE students
ADD COLUMN academic_level ENUM('Masters', 'PhD') NOT NULL DEFAULT 'Masters';
