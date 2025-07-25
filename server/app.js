const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');
const supervisorRoutes = require('./routes/supervisor');
const campusRoutes = require('./routes/campus');
const departmentRoutes = require('./routes/department');
const courseRoutes = require('./routes/course');
const academicPeriodRoutes = require('./routes/academic_period');
const projectRoutes = require('./routes/project');
const supervisionAllocationRoutes = require('./routes/supervision_allocation');
const panelRoutes = require('./routes/panel');
const panelMemberRoutes = require('./routes/panel_member');
const presentationRoutes = require('./routes/presentation');
const documentSubmissionRoutes = require('./routes/document_submission');
const feedbackCommentRoutes = require('./routes/feedback_comment');
const publicationRoutes = require('./routes/publication');
const notificationRoutes = require('./routes/notification');
const activityLogRoutes = require('./routes/activity_log');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/campuses', campusRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/academic-periods', academicPeriodRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/supervision-allocations', supervisionAllocationRoutes);
app.use('/api/panels', panelRoutes);
app.use('/api/panel-members', panelMemberRoutes);
app.use('/api/presentations', presentationRoutes);
app.use('/api/document-submissions', documentSubmissionRoutes);
app.use('/api/feedback-comments', feedbackCommentRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '/n Backend is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

module.exports = app;
