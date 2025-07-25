const app = require('./app');
const sequelize = require('./config/sequelize');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
})();

