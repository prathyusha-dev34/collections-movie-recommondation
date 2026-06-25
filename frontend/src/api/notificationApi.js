import API from "./api";
 
// GET ALL NOTIFICATIONS
export const getNotifications = (userId) => {
  return API.get(
    `/api/notifications/notifications?user_id=${userId}`
  );
};
 
// GET UNREAD COUNT
export const getUnreadCount = (userId) => {
  return API.get(
    `/api/notifications/notifications/unread-count?user_id=${userId}`
  );
};
 
// MARK AS READ
export const markAsRead = (id) => {
  return API.put(
    `/api/notifications/notifications/${id}/read`
  );
};