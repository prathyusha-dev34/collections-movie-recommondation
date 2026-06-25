import React, { useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
} from "../api/notificationApi";
 
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
 
  // Temporary user id for testing
  const userId = 1;
 
  const fetchData = async () => {
    try {
      const res1 = await getNotifications(userId);
      const res2 = await getUnreadCount(userId);
 
      console.log("Notifications:", res1.data);
 
      setNotifications(res1.data || []);
      setCount(res2.data?.unread_count || 0);
    } catch (err) {
      console.error("Notification Error:", err);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
 
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          cursor: "pointer",
          fontSize: "24px",
          color: "white",
        }}
        onClick={() => setOpen(!open)}
      >
        🔔 {count > 0 && <span>({count})</span>}
      </div>
 
      {open && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: "0",
            width: "320px",
            background: "white",
            color: "black",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          <h3>Notifications</h3>
 
          {notifications.length === 0 ? (
            <p>No Notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleRead(n.id)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <strong>{n.type}</strong>
                <p>{n.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
 
export default NotificationBell;