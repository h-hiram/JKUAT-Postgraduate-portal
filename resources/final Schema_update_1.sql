-- 1. student_courses.assigned_at
ALTER TABLE student_courses
MODIFY assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 2. project_overall_progress.last_updated
ALTER TABLE project_overall_progress
MODIFY last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 3. document_submissions.upload_date
ALTER TABLE document_submissions
MODIFY upload_date DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 4. feedback_comments.commented_at
ALTER TABLE feedback_comments
MODIFY commented_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 5. publications.published_date
ALTER TABLE publications
MODIFY published_date DATE DEFAULT CURRENT_DATE;

-- 6. panels.created_at
ALTER TABLE panels
MODIFY created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 7. publication_comments.commented_at
ALTER TABLE publication_comments
MODIFY commented_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 8. notifications.sent_at
ALTER TABLE notifications
MODIFY sent_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 9. presentation_feedback.commented_at
ALTER TABLE presentation_feedback
MODIFY commented_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- 10. activity_logs.timestamp
ALTER TABLE activity_logs
MODIFY timestamp DATETIME DEFAULT CURRENT_TIMESTAMP;

-- this will add createdAt and updatedAt columns to the users table
-- with default values for creation and update timestamps
--this is done because sequelize uses timestamps by default and its required in the users table
ALTER TABLE users
ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 
