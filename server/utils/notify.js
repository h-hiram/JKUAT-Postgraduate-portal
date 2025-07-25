const { Notification, ActivityLog } = require('../models');

async function notify(userIds, message, actorUserId = null) {
  if (!Array.isArray(userIds)) userIds = [userIds];
  const notifications = await Promise.all(userIds.map(user_id =>
    Notification.create({ user_id, message, read_status: false })
  ));
  if (actorUserId) {
    await ActivityLog.create({
      actor_user_id: actorUserId,
      action_type: 'notify',
      target_type: 'notification',
      target_id: notifications.map(n => n.id).join(','),
      description: `Sent notification: ${message}`
    });
  }
  return notifications;
}

module.exports = notify; 