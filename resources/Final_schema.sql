CREATE DATABASE postgraduate_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE postgraduate_portal;

-- 1. USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student', 'supervisor') NOT NULL
);

-- 2. CAMPUSES
CREATE TABLE campuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(150)
);

-- 3. DEPARTMENTS (linked to a campus)
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    campus_id INT NOT NULL,
    FOREIGN KEY (campus_id) REFERENCES campuses(id)
);

-- 4. COURSES (linked to departments which are linked to campuses)
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20),
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- 5. ACADEMIC PERIODS
CREATE TABLE academic_periods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year YEAR NOT NULL,
    semester VARCHAR(20),
    start_date DATE,
    end_date DATE
);

-- 6. STUDENTS
CREATE TABLE students (
    user_id INT PRIMARY KEY,
    reg_no VARCHAR(50) UNIQUE,
    department_id INT,
    campus_id INT,
    current_period_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (campus_id) REFERENCES campuses(id),
    FOREIGN KEY (current_period_id) REFERENCES academic_periods(id)
);

-- 7. SUPERVISORS
CREATE TABLE supervisors (
    user_id INT PRIMARY KEY,
    staff_number VARCHAR(50) UNIQUE,
    department_id INT,
    campus_id INT,
    specialization VARCHAR(150),
    academic_rank VARCHAR(50),
    phone_number VARCHAR(20),
    office_location VARCHAR(100),
    availability_status VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (campus_id) REFERENCES campuses(id)
);

-- 8. STUDENT-COURSES (many-to-many with UNIQUE to prevent duplication)
CREATE TABLE student_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE (student_id, course_id)
);

-- 9. SUPERVISION ROLES
CREATE TABLE supervision_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) 
);

-- 10. PROJECTS (linked to course)
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    title VARCHAR(200),
    abstract TEXT,
    status VARCHAR(30),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- 11. SUPERVISION ALLOCATIONS (uses supervision_roles)
CREATE TABLE supervision_allocations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    supervisor_id INT,
    role_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(user_id),
    FOREIGN KEY (role_id) REFERENCES supervision_roles(id)
);

-- 12. PROJECT PHASES
/*proposal,research project,documentation,defence*/
CREATE TABLE project_phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    sequence_order INT
);


-- 13. PROJECT PHASE PROGRESS- which phase,problemstatemnt,lr,research or at research project-introduction,ps,object &LR,meth anals
CREATE TABLE project_phase_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    phase_id INT,
    status VARCHAR(30),
    start_date DATE,
    completion_date DATE,
    supervisor_feedback TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (phase_id) REFERENCES project_phases(id)
);

-- 14. PROJECT OVERALL PROGRESS
CREATE TABLE project_overall_progress (
    project_id INT PRIMARY KEY,
    percentage INT CHECK (percentage BETWEEN 0 AND 100),
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- 15. DOCUMENT SUBMISSIONS
CREATE TABLE document_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    phase_id INT,
    file_path VARCHAR(255),
    upload_date DATETIME,
    description TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (phase_id) REFERENCES project_phases(id)
);

-- 16. FEEDBACK COMMENTS (includes phase_id)
CREATE TABLE feedback_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT,
    supervisor_id INT,
    phase_id INT,
    comment TEXT,
    commented_at DATETIME,
    FOREIGN KEY (submission_id) REFERENCES document_submissions(id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(user_id),
    FOREIGN KEY (phase_id) REFERENCES project_phases(id)
);

-- 17.  --if some work was made a publication somewhere
CREATE TABLE publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    title VARCHAR(200),
    publication_name VARCHAR(150),
    file_path VARCHAR(255),
    published_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(user_id)
);

-- 18. PANELS
CREATE TABLE panels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 19. PUBLICATION COMMENTS (linked to panel incorrect, this after or during but does not involve a panel, may be conference,workshop or a publisher)
CREATE TABLE publication_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publication_id INT,
    source_type ENUM('supervisor', 'external') NOT NULL,
    supervisor_id INT,                     -- Only if internal
    external_name VARCHAR(150),           -- Only if external
    external_affiliation VARCHAR(150),    -- e.g., Journal, Conference
    comment TEXT,
    commented_at DATETIME,
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(user_id)
);

-- 20. SPONSORSHIPS
CREATE TABLE sponsorships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    sponsor_name VARCHAR(150),
    sponsor_type VARCHAR(50),
    amount DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(30),
    FOREIGN KEY (student_id) REFERENCES students(user_id)
);

-- 21. NOTIFICATIONS
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT,
    read_status BOOLEAN DEFAULT FALSE,
    sent_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 22. PANEL MEMBERS
CREATE TABLE panel_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    panel_id INT,
    supervisor_id INT,
    role VARCHAR(50),
    FOREIGN KEY (panel_id) REFERENCES panels(id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(user_id)
);

-- 23. PRESENTATIONS
CREATE TABLE presentations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    panel_id INT,
    type VARCHAR(50),
    scheduled_date DATE,
    actual_date DATE,
    venue VARCHAR(150),
    status VARCHAR(30),
    final_decision VARCHAR(50),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (panel_id) REFERENCES panels(id)
);

-- 24. PRESENTATION FEEDBACK
CREATE TABLE presentation_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    presentation_id INT,
    supervisor_id INT,
    comment TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    commented_at DATETIME,
    FOREIGN KEY (presentation_id) REFERENCES presentations(id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(user_id)
);

-- 25. ACTIVITY LOGS
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor_user_id INT,
    action_type VARCHAR(50),
    target_type VARCHAR(50),
    target_id INT,
    description TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_user_id) REFERENCES users(id)
);
