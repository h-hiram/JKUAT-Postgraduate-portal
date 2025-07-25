const User = require('./user');
const Student = require('./student');
const Supervisor = require('./supervisor');
const Campus = require('./campus');
const Department = require('./department');
const Course = require('./course');
const AcademicPeriod = require('./academic_period');
const StudentCourse = require('./student_course');
const Project = require('./project');
const SupervisionRole = require('./supervision_role');
const SupervisionAllocation = require('./supervision_allocation');
const ProjectPhase = require('./project_phase');
const ProjectPhaseProgress = require('./project_phase_progress');
const ProjectOverallProgress = require('./project_overall_progress');
const DocumentSubmission = require('./document_submission');
const FeedbackComment = require('./feedback_comment');
const Publication = require('./publication');
const PublicationComment = require('./publication_comment');
const Sponsorship = require('./sponsorship');
const Notification = require('./notification');
const Panel = require('./panel');
const PanelMember = require('./panel_member');
const Presentation = require('./presentation');
const PresentationFeedback = require('./presentation_feedback');
const ActivityLog = require('./activity_log');

// Associations
// User - Student Supervisor
User.hasOne(Student, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Supervisor, { foreignKey: 'user_id' });
Supervisor.belongsTo(User, { foreignKey: 'user_id' });

// Campus - Department Student Supervisor
Campus.hasMany(Department, { foreignKey: 'campus_id' });
Department.belongsTo(Campus, { foreignKey: 'campus_id' });
Campus.hasMany(Student, { foreignKey: 'campus_id' });
Student.belongsTo(Campus, { foreignKey: 'campus_id' });
Campus.hasMany(Supervisor, { foreignKey: 'campus_id' });
Supervisor.belongsTo(Campus, { foreignKey: 'campus_id' });

// Department - Course Student Supervisor
Department.hasMany(Course, { foreignKey: 'department_id' });
Course.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Student, { foreignKey: 'department_id' });
Student.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Supervisor, { foreignKey: 'department_id' });
Supervisor.belongsTo(Department, { foreignKey: 'department_id' });

// AcademicPeriod - Student
AcademicPeriod.hasMany(Student, { foreignKey: 'current_period_id' });
Student.belongsTo(AcademicPeriod, { foreignKey: 'current_period_id' });

// Student - StudentCourse Project Sponsorship Publication
Student.hasMany(StudentCourse, { foreignKey: 'student_id' });
StudentCourse.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(Project, { foreignKey: 'student_id' });
Project.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(Sponsorship, { foreignKey: 'student_id' });
Sponsorship.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(Publication, { foreignKey: 'student_id' });
Publication.belongsTo(Student, { foreignKey: 'student_id' });

// Course - StudentCourse Project
Course.hasMany(StudentCourse, { foreignKey: 'course_id' });
StudentCourse.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(Project, { foreignKey: 'course_id' });
Project.belongsTo(Course, { foreignKey: 'course_id' });

// Project - SupervisionAllocation ProjectPhaseProgress ProjectOverallProgress DocumentSubmission Presentation
Project.hasMany(SupervisionAllocation, { foreignKey: 'project_id' });
SupervisionAllocation.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(ProjectPhaseProgress, { foreignKey: 'project_id' });
ProjectPhaseProgress.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasOne(ProjectOverallProgress, { foreignKey: 'project_id' });
ProjectOverallProgress.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(DocumentSubmission, { foreignKey: 'project_id' });
DocumentSubmission.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(Presentation, { foreignKey: 'project_id' });
Presentation.belongsTo(Project, { foreignKey: 'project_id' });

// SupervisionRole - SupervisionAllocation
SupervisionRole.hasMany(SupervisionAllocation, { foreignKey: 'role_id' });
SupervisionAllocation.belongsTo(SupervisionRole, { foreignKey: 'role_id' });

// Supervisor - SupervisionAllocation FeedbackComment PanelMember PresentationFeedback PublicationComment
Supervisor.hasMany(SupervisionAllocation, { foreignKey: 'supervisor_id' });
SupervisionAllocation.belongsTo(Supervisor, { foreignKey: 'supervisor_id' });
Supervisor.hasMany(FeedbackComment, { foreignKey: 'supervisor_id' });
FeedbackComment.belongsTo(Supervisor, { foreignKey: 'supervisor_id' });
Supervisor.hasMany(PanelMember, { foreignKey: 'supervisor_id' });
PanelMember.belongsTo(Supervisor, { foreignKey: 'supervisor_id' });
Supervisor.hasMany(PresentationFeedback, { foreignKey: 'supervisor_id' });
PresentationFeedback.belongsTo(Supervisor, { foreignKey: 'supervisor_id' });
Supervisor.hasMany(PublicationComment, { foreignKey: 'supervisor_id' });
PublicationComment.belongsTo(Supervisor, { foreignKey: 'supervisor_id' });

// ProjectPhase - ProjectPhaseProgress DocumentSubmission FeedbackComment
ProjectPhase.hasMany(ProjectPhaseProgress, { foreignKey: 'phase_id' });
ProjectPhaseProgress.belongsTo(ProjectPhase, { foreignKey: 'phase_id' });
ProjectPhase.hasMany(DocumentSubmission, { foreignKey: 'phase_id' });
DocumentSubmission.belongsTo(ProjectPhase, { foreignKey: 'phase_id' });
ProjectPhase.hasMany(FeedbackComment, { foreignKey: 'phase_id' });
FeedbackComment.belongsTo(ProjectPhase, { foreignKey: 'phase_id' });

// DocumentSubmission - FeedbackComment
DocumentSubmission.hasMany(FeedbackComment, { foreignKey: 'submission_id' });
FeedbackComment.belongsTo(DocumentSubmission, { foreignKey: 'submission_id' });

// Publication - PublicationComment
Publication.hasMany(PublicationComment, { foreignKey: 'publication_id' });
PublicationComment.belongsTo(Publication, { foreignKey: 'publication_id' });

// Panel - PanelMember Presentation
Panel.hasMany(PanelMember, { foreignKey: 'panel_id' });
PanelMember.belongsTo(Panel, { foreignKey: 'panel_id' });
Panel.hasMany(Presentation, { foreignKey: 'panel_id' });
Presentation.belongsTo(Panel, { foreignKey: 'panel_id' });

// Presentation - PresentationFeedback
Presentation.hasMany(PresentationFeedback, { foreignKey: 'presentation_id' });
PresentationFeedback.belongsTo(Presentation, { foreignKey: 'presentation_id' });

// User - Notification ActivityLog
User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(ActivityLog, { foreignKey: 'actor_user_id' });
ActivityLog.belongsTo(User, { foreignKey: 'actor_user_id' });

module.exports = {
  User,
  Student,
  Supervisor,
  Campus,
  Department,
  Course,
  AcademicPeriod,
  StudentCourse,
  Project,
  SupervisionRole,
  SupervisionAllocation,
  ProjectPhase,
  ProjectPhaseProgress,
  ProjectOverallProgress,
  DocumentSubmission,
  FeedbackComment,
  Publication,
  PublicationComment,
  Sponsorship,
  Notification,
  Panel,
  PanelMember,
  Presentation,
  PresentationFeedback,
  ActivityLog
}; 