import { useState } from 'react';
import { motion } from 'framer-motion';

function Settings() {
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    billingAlerts: true,
    monthlyReports: true,
    darkMode: false
  });

  const toggleSetting = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name]
    });
  };

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>System Settings</p>
          <h1 style={styles.title}>Settings & Preferences</h1>
          <p style={styles.subtitle}>
            Manage admin profile, notifications and automation preferences.
          </p>
        </div>

        <div style={styles.badge}>⚙️ Admin Controls</div>
      </header>

      <section style={styles.grid}>
        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Admin Profile</h2>
          <p style={styles.cardSub}>Current logged-in system manager.</p>

          <div style={styles.profileBox}>
            <div style={styles.avatar}>AU</div>
            <div>
              <h3 style={styles.profileName}>Admin User</h3>
              <p style={styles.profileRole}>System Manager</p>
            </div>
          </div>

          <input style={styles.input} value="admin@healthcareplus.com" readOnly />
          <input style={styles.input} value="HealthCare Plus Admin Portal" readOnly />
        </motion.div>

        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Automation Preferences</h2>
          <p style={styles.cardSub}>Control smart background actions.</p>

          <SettingToggle
            title="Appointment Reminders"
            description="Automatically remind patients before appointments."
            checked={settings.appointmentReminders}
            onClick={() => toggleSetting('appointmentReminders')}
          />

          <SettingToggle
            title="Billing Alerts"
            description="Notify staff when subscriptions are pending or overdue."
            checked={settings.billingAlerts}
            onClick={() => toggleSetting('billingAlerts')}
          />

          <SettingToggle
            title="Monthly Reports"
            description="Generate monthly patient and billing reports."
            checked={settings.monthlyReports}
            onClick={() => toggleSetting('monthlyReports')}
          />

          <SettingToggle
            title="Dark Mode"
            description="Enable dark interface preference."
            checked={settings.darkMode}
            onClick={() => toggleSetting('darkMode')}
          />
        </motion.div>
      </section>

      <section style={styles.bottomGrid}>
        <motion.div style={styles.systemCard} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>System Status</h2>
          <p style={styles.cardSub}>Current application environment.</p>

          <div style={styles.statusRow}>
            <span>Backend API</span>
            <strong style={styles.online}>Connected</strong>
          </div>

          <div style={styles.statusRow}>
            <span>Database</span>
            <strong style={styles.online}>MongoDB Atlas</strong>
          </div>

          <div style={styles.statusRow}>
            <span>Frontend</span>
            <strong style={styles.online}>React + Vite</strong>
          </div>
        </motion.div>

        <motion.div style={styles.securityCard} whileHover={{ y: -5 }}>
          <h2 style={styles.darkTitle}>Security Overview</h2>
          <p style={styles.darkSub}>
            JWT authentication and role-based middleware are prepared for
            protected access.
          </p>

          <div style={styles.securityItem}>✅ JWT Authentication</div>
          <div style={styles.securityItem}>✅ Password Hashing</div>
          <div style={styles.securityItem}>✅ Protected API Design</div>
        </motion.div>
      </section>
    </motion.div>
  );
}

function SettingToggle({ title, description, checked, onClick }) {
  return (
    <div style={styles.toggleRow}>
      <div>
        <p style={styles.toggleTitle}>{title}</p>
        <p style={styles.toggleDesc}>{description}</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        style={checked ? styles.toggleOn : styles.toggleOff}
        aria-label={`Toggle ${title}`}
      >
        <span style={checked ? styles.toggleCircleOn : styles.toggleCircleOff} />
      </button>
    </div>
  );
}

const styles = {
  page: { color: '#0f172a' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  kicker: { margin: 0, color: '#0891b2', fontWeight: 900 },
  title: { margin: '6px 0', fontSize: 36, fontWeight: 900 },
  subtitle: { margin: 0, color: '#64748b' },
  badge: {
    background: '#ecfeff',
    color: '#155e75',
    padding: '12px 18px',
    borderRadius: 999,
    fontWeight: 900
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.3fr',
    gap: 24,
    marginBottom: 24
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24
  },
  card: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  systemCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  securityCard: {
    background: '#020617',
    color: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.15)'
  },
  cardTitle: { margin: 0, fontSize: 24, fontWeight: 900 },
  cardSub: { margin: '8px 0 20px', color: '#64748b' },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: '#f8fafc',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: '50%',
    background: '#0891b2',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 900,
    fontSize: 18
  },
  profileName: { margin: 0, fontSize: 20 },
  profileRole: { margin: '4px 0 0', color: '#64748b' },
  input: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    marginTop: 12,
    boxSizing: 'border-box',
    fontSize: 14,
    color: '#475569',
    background: '#f8fafc'
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  toggleTitle: { margin: 0, fontWeight: 900 },
  toggleDesc: { margin: '5px 0 0', color: '#64748b', fontSize: 14 },
  toggleOn: {
    width: 58,
    height: 32,
    borderRadius: 999,
    border: 0,
    background: '#0891b2',
    padding: 4,
    cursor: 'pointer'
  },
  toggleOff: {
    width: 58,
    height: 32,
    borderRadius: 999,
    border: 0,
    background: '#cbd5e1',
    padding: 4,
    cursor: 'pointer'
  },
  toggleCircleOn: {
    display: 'block',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'white',
    marginLeft: 'auto'
  },
  toggleCircleOff: {
    display: 'block',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'white'
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  online: { color: '#0891b2' },
  darkTitle: { margin: 0, fontSize: 24 },
  darkSub: { color: '#94a3b8', lineHeight: 1.7 },
  securityItem: {
    background: '#0f172a',
    padding: 14,
    borderRadius: 16,
    marginTop: 12,
    color: '#dbeafe',
    fontWeight: 800
  }
};

export default Settings;