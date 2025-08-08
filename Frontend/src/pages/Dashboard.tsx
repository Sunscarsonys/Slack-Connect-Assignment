import { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import {
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
  Slack,
  Plus,
  X,
  MessageSquare,
  Calendar,
  Hash,
  Activity,
  Sparkles,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [team, setTeam] = useState<{ teamId: string; teamName: string } | null>(
    null
  );
  const [channel, setChannel] = useState("");
  const [text, setText] = useState("");
  const [when, setWhen] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/auth/me`, { credentials: "include" }).then(async (r) => {
      if (r.ok) setTeam(await r.json());
    });
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const sendNow = async () => {
    if (!channel.trim() || !text.trim()) {
      showNotification("error", "Please fill in both channel and message");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/messages/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, text }),
      });
      if (response.ok) {
        showNotification("success", "Message sent!");
        setText("");
      } else throw new Error();
    } catch {
      showNotification("error", "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const schedule = async () => {
    if (!channel.trim() || !text.trim() || !when) {
      showNotification("error", "Please fill in all scheduling fields");
      return;
    }
    setLoading(true);
    try {
      const epoch = Math.floor(new Date(when).getTime() / 1000);
      const response = await fetch(`${API_BASE}/messages/schedule`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, text, postAt: epoch }),
      });
      if (response.ok) {
        showNotification("success", "Message scheduled!");
        setText("");
        setWhen("");
      } else throw new Error();
    } catch {
      showNotification("error", "Failed to schedule message");
    } finally {
      setLoading(false);
    }
  };

  if (!team) {
    return (
      <div className={styles.fullScreenCenter}>
        <div className={styles.glassCard}>
          <AlertCircle size={60} className={styles.iconPurpleGlow} />
          <h2>Connection Required</h2>
          <p>Connect to your Slack workspace to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {notification && (
        <div
          className={`${styles.notification} ${
            notification.type === "success"
              ? styles.notifySuccess
              : styles.notifyError
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      <div className={styles.headerCard}>
        <div className={styles.headerLeft}>
          <div className={styles.slackIcon}>
            <Slack size={28} />
          </div>
          <div>
            <h1>Send Your Message</h1>
            <div className={styles.connected}>
              <Activity size={14} />
              <span>Connected to {team.teamName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.glassCard}>
          <div className={styles.sectionHeader}>
            <MessageSquare size={20} />
            <h2>Compose</h2>
            <Sparkles size={16} />
          </div>

          <label>Target Channel or User</label>
          <div className={styles.inputGroup}>
            <Hash size={14} />
            <input
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="general, @username, or channel ID"
            />
          </div>

          <label>Message Content</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your message..."
          />

          <button
            className={styles.btnCyan}
            onClick={sendNow}
            disabled={loading || !channel || !text}
          >
            {loading ? "Sending..." : "Send Instantly"}
          </button>

          <div className={styles.scheduleSection}>
            <h3>
              <Clock size={16} /> Schedule Message
            </h3>
            <label>Schedule Time</label>
            <div className={styles.inputGroup}>
              <Calendar size={14} />
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
            </div>
            <button
              className={styles.btnPurple}
              onClick={schedule}
              disabled={loading || !channel || !text || !when}
            >
              <Plus size={14} /> Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
