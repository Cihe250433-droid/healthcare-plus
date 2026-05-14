import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Settings() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [settings, setSettings] = useState({
    appointmentReminders: true,
    billingAlerts: true,
    monthlyReports: true,
    compactLayout: false,
    staffNotifications: true,
    autoBackup: true
  });

  const toggleSetting = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name]
    });
  };

  const quickLinks = [
    { title: 'Dashboard', icon: '🏠', path: '/' },
    { title: 'Patients', icon: '👥', path: '/patients' },
    { title: 'Appointments', icon: '📅', path: '/appointments' },
    { title: 'Billing', icon: '💳', path: '/billing' }
  ];

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>System Settings</p>
          <h1 style={styles.title}>Settings & Admin Controls</h1>
          <p style={styles.subtitle}>
            Manage admin profile, automation controls, navigation shortcuts and system actions.
          </p>
        </div>

        <div style={styles.badge}>⚙️ Admin Panel</div>
      </header>

      <section style={styles.grid}>
        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Admin Profile</h2>
          <p style={styles.cardSub}>Current system manager account.</p>

          <div style={styles.profileBox}>
            <motion.div
              style={styles.avatar}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              AU
            </motion.div>

            <div>
              <h3 style={styles.profileName}>Admin User</h3>
              <p style={styles.profileRole}>System Manager</p>
            </div>
          </div>

          <input style={styles.input} value="admin@healthcareplus.com" readOnly />
          <input style={styles.input} value="HealthCare Plus Admin Portal" readOnly />

          <div style={styles.buttonGrid}>
            <button type="button" style={styles.adminButton}>
              Edit Profile
            </button>
            <button type="button" style={styles.adminButtonDark}>
              Change Password
            </button>
          </div>
        </motion.div>

        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Automation Controls</h2>
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
            title="Staff Notifications"
            description="Send important system updates to staff."
            checked={settings.staffNotifications}
            onClick={() => toggleSetting('staffNotifications')}
          />

          <SettingToggle
            title="Auto Backup"
            description="Enable automatic backup preparation for records."
            checked={settings.autoBackup}
            onClick={() => toggleSetting('autoBackup')}
          />

          <SettingToggle
            title="Compact Layout"
            description="Reduce spacing for dashboard cards and tables."
            checked={settings.compactLayout}
            onClick={() => toggleSetting('compactLayout')}
          />
        </motion.div>
      </section>

      <section style={styles.bottomGrid}>
        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Navigation Shortcuts</h2>
          <p style={styles.cardSub}>Quick access to main system pages.</p>

          <div style={styles.quickGrid}>
            {quickLinks.map((link) => (
              <motion.button
                key={link.title}
                type="button"
                style={styles.quickButton}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(link.path)}
              >
                <span style={styles.quickIcon}>{link.icon}</span>
                <span>{link.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div style={styles.systemCard} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>System Status</h2>
          <p style={styles.cardSub}>Current application environment.</p>

          <StatusRow label="Backend API" value="Connected" />
          <StatusRow label="Database" value="MongoDB Atlas" />
          <StatusRow label="Frontend" value="React + Vite" />
          <StatusRow label="Animations" value="Framer Motion" />

          <div style={styles.buttonGrid}>
            <button type="button" style={styles.adminButton}>
              Export Logs
            </button>
            <button type="button" style={styles.adminButtonDark}>
              Backup Data
            </button>
          </div>
        </motion.div>
      </section>

      <section style={styles.logoutGrid}>
        <motion.div style={styles.securityCard} whileHover={{ y: -5 }}>
          <h2 style={styles.darkTitle}>Security Overview</h2>
          <p style={styles.darkSub}>
            JWT authentication and role-based middleware are prepared for protected access.
          </p>

          <div style={styles.securityItem}>✅ JWT Authentication Ready</div>
          <div style={styles.securityItem}>✅ Password Hashing Prepared</div>
          <div style={styles.securityItem}>✅ Protected API Design</div>
        </motion.div>

        <motion.div style={styles.logoutCard} whileHover={{ y: -5 }}>
          <h2 style={styles.logoutTitle}>Logout Section</h2>
          <p style={styles.logoutText}>
            End the current admin session and return to a safe system state.
          </p>

          <button
            type="button"
            style={styles.logoutButton}
            onClick={() => setShowLogoutModal(true)}
          >
            Logout Admin
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              style={styles.modalCard}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalIcon}>🚪</div>
              <h2 style={styles.modalTitle}>Confirm Logout</h2>
              <p style={styles.modalText}>
                This demo does not currently use a full login session, but this confirms the logout workflow for assessment demonstration.
              </p>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  style={styles.confirmLogoutButton}
                  onClick={() => {
                    setShowLogoutModal(false);
                    navigate('/');
                  }}
                >
                  Confirm Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <motion.span
          style={styles.toggleCircle}
          animate={{ x: checked ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </button>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div style={styles.statusRow}>
      <span>{label}</span>
      <strong style={styles.online}>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    color: '#0f172a'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 24,
    flexWrap: 'wrap'
  },
  kicker: {
    margin: 0,
    color: '#0891b2',
    fontWeight: 900,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontSize: 12
  },
  title: {
    margin: '8px 0',
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: '-0.04em'
  },
  subtitle: {
    margin: 0,
    color: '#64748b',
    lineHeight: 1.7,
    maxWidth: 760
  },
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
    gap: 24,
    marginBottom: 24
  },
  logoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
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
  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900
  },
  cardSub: {
    margin: '8px 0 20px',
    color: '#64748b',
    lineHeight: 1.6
  },
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
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 900,
    fontSize: 18
  },
  profileName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900
  },
  profileRole: {
    margin: '4px 0 0',
    color: '#64748b'
  },
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
  buttonGrid: {
    display: 'flex',
    gap: 12,
    marginTop: 18,
    flexWrap: 'wrap'
  },
  adminButton: {
    border: 0,
    background: '#ecfeff',
    color: '#155e75',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  },
  adminButtonDark: {
    border: 0,
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  toggleTitle: {
    margin: 0,
    fontWeight: 900
  },
  toggleDesc: {
    margin: '5px 0 0',
    color: '#64748b',
    fontSize: 14,
    lineHeight: 1.5
  },
  toggleOn: {
    width: 62,
    height: 34,
    borderRadius: 999,
    border: 0,
    background: '#0891b2',
    padding: 5,
    cursor: 'pointer'
  },
  toggleOff: {
    width: 62,
    height: 34,
    borderRadius: 999,
    border: 0,
    background: '#cbd5e1',
    padding: 5,
    cursor: 'pointer'
  },
  toggleCircle: {
    display: 'block',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'white'
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 14
  },
  quickButton: {
    border: 0,
    background: 'linear-gradient(135deg, #ffffff, #ecfeff)',
    borderRadius: 20,
    padding: 18,
    cursor: 'pointer',
    fontWeight: 900,
    color: '#0f172a',
    boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
    display: 'grid',
    gap: 8,
    justifyItems: 'center'
  },
  quickIcon: {
    fontSize: 28
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  online: {
    color: '#0891b2'
  },
  securityCard: {
    background: '#020617',
    color: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.15)'
  },
  darkTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900
  },
  darkSub: {
    color: '#94a3b8',
    lineHeight: 1.7
  },
  securityItem: {
    background: '#0f172a',
    padding: 14,
    borderRadius: 16,
    marginTop: 12,
    color: '#dbeafe',
    fontWeight: 800
  },
  logoutCard: {
    background: 'linear-gradient(135deg, #fff1f2, #ffffff)',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)',
    border: '1px solid #fecdd3'
  },
  logoutTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900,
    color: '#991b1b'
  },
  logoutText: {
    color: '#7f1d1d',
    lineHeight: 1.7
  },
  logoutButton: {
    border: 0,
    background: '#dc2626',
    color: 'white',
    padding: '13px 18px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2,6,23,0.65)',
    backdropFilter: 'blur(10px)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 999,
    padding: 20
  },
  modalCard: {
    background: 'white',
    width: '100%',
    maxWidth: 460,
    borderRadius: 30,
    padding: 30,
    boxShadow: '0 30px 90px rgba(2,6,23,0.35)',
    textAlign: 'center'
  },
  modalIcon: {
    fontSize: 46,
    marginBottom: 12
  },
  modalTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900
  },
  modalText: {
    color: '#64748b',
    lineHeight: 1.7
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 20
  },
  cancelButton: {
    border: 0,
    background: '#e2e8f0',
    color: '#0f172a',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  },
  confirmLogoutButton: {
    border: 0,
    background: '#dc2626',
    color: 'white',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  }
};

export default Settings;