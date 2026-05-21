import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Settings() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@healthcareplus.com',
    role: 'Clinic Manager',
    portal: 'HealthCare Plus'
  });

  const [savedProfile, setSavedProfile] = useState(profile);

  const [settings, setSettings] = useState({
    appointmentReminders: true,
    billingAlerts: true,
    monthlyReports: true,
    staffNotifications: true,
    autoBackup: true,
    compactLayout: false
  });

  const quickLinks = [
    { title: 'Dashboard', icon: 'Home', path: '/', description: 'Go back to the main overview.' },
    { title: 'Patients', icon: 'People', path: '/patients', description: 'Add or update patient records.' },
    { title: 'Appointments', icon: 'Calendar', path: '/appointments', description: 'Review and create bookings.' },
    { title: 'Billing', icon: 'Payments', path: '/billing', description: 'Check care plans and payments.' }
  ];

  const toggleSetting = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setSavedProfile(profile);
    setMessage('Admin details updated.');
  };

  const resetProfile = () => {
    setProfile(savedProfile);
    setMessage('Profile changes reset.');
  };

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Settings</p>
          <h1 style={styles.title}>Manage your workspace</h1>
          <p style={styles.subtitle}>
            Update admin details, reminders, shortcuts and simple system options.
          </p>
        </div>

        <div style={styles.badge}>Admin area</div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form style={styles.card} onSubmit={saveProfile} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Admin details</h2>
          <p style={styles.cardSub}>Keep the clinic admin information up to date.</p>

          <div style={styles.profileBox}>
            <div style={styles.avatar}>
              {profile.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
            </div>

            <div>
              <h3 style={styles.profileName}>{savedProfile.name}</h3>
              <p style={styles.profileRole}>{savedProfile.role}</p>
            </div>
          </div>

          <label style={styles.label}>
            Name
            <input style={styles.input} name="name" value={profile.name} onChange={handleProfileChange} />
          </label>

          <label style={styles.label}>
            Email
            <input style={styles.input} name="email" value={profile.email} onChange={handleProfileChange} />
          </label>

          <label style={styles.label}>
            Role
            <input style={styles.input} name="role" value={profile.role} onChange={handleProfileChange} />
          </label>

          <label style={styles.label}>
            Clinic name
            <input style={styles.input} name="portal" value={profile.portal} onChange={handleProfileChange} />
          </label>

          <div style={styles.buttonGrid}>
            <button type="submit" style={styles.adminButtonDark}>Save details</button>
            <button type="button" style={styles.adminButton} onClick={resetProfile}>Reset</button>
          </div>
        </motion.form>

        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Reminders and updates</h2>
          <p style={styles.cardSub}>Choose which helpful updates should stay on.</p>

          <SettingToggle title="Appointment reminders" description="Remind staff before scheduled visits." checked={settings.appointmentReminders} onClick={() => toggleSetting('appointmentReminders')} />
          <SettingToggle title="Billing alerts" description="Highlight payments that need attention." checked={settings.billingAlerts} onClick={() => toggleSetting('billingAlerts')} />
          <SettingToggle title="Monthly reports" description="Prepare a simple monthly activity summary." checked={settings.monthlyReports} onClick={() => toggleSetting('monthlyReports')} />
          <SettingToggle title="Staff notifications" description="Show important updates for the clinic team." checked={settings.staffNotifications} onClick={() => toggleSetting('staffNotifications')} />
          <SettingToggle title="Record backup reminder" description="Remind admin to keep data safely backed up." checked={settings.autoBackup} onClick={() => toggleSetting('autoBackup')} />
          <SettingToggle title="Compact view" description="Use slightly tighter spacing on larger tables." checked={settings.compactLayout} onClick={() => toggleSetting('compactLayout')} />
        </motion.div>
      </section>

      <section style={styles.bottomGrid}>
        <motion.div style={styles.card} whileHover={{ y: -5 }}>
          <h2 style={styles.cardTitle}>Shortcuts</h2>
          <p style={styles.cardSub}>Jump to the pages used most often.</p>

          <div style={styles.quickGrid}>
            {quickLinks.map((link) => (
              <button key={link.title} type="button" style={styles.quickButton} onClick={() => navigate(link.path)}>
                <strong>{link.title}</strong>
                <span>{link.description}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div style={styles.logoutCard} whileHover={{ y: -5 }}>
          <h2 style={styles.logoutTitle}>Logout</h2>
          <p style={styles.logoutText}>
            Finish the current admin session and return to the main dashboard.
          </p>

          <button type="button" style={styles.logoutButton} onClick={() => setShowLogoutModal(true)}>
            Logout
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
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={styles.modalTitle}>Logout?</h2>
              <p style={styles.modalText}>
                This will close the admin workflow and take you back to the dashboard.
              </p>

              <div style={styles.modalActions}>
                <button type="button" style={styles.cancelButton} onClick={() => setShowLogoutModal(false)}>Cancel</button>
                <button type="button" style={styles.confirmLogoutButton} onClick={() => { setShowLogoutModal(false); navigate('/'); }}>Logout</button>
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

      <button type="button" onClick={onClick} style={checked ? styles.toggleOn : styles.toggleOff}>
        <motion.span
          style={styles.toggleCircle}
          animate={{ x: checked ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </button>
    </div>
  );
}

const styles = {
  page: { color: '#0f172a' },
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
    color: '#0e7490',
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
  message: {
    background: '#ecfeff',
    color: '#155e75',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    fontWeight: 800
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.3fr',
    gap: 24,
    marginBottom: 24
  },
  bottomGrid: {
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
  cardTitle: { margin: 0, fontSize: 24, fontWeight: 900 },
  cardSub: { margin: '8px 0 20px', color: '#64748b', lineHeight: 1.6 },
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
    background: '#0e7490',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 900,
    fontSize: 18
  },
  profileName: { margin: 0, fontSize: 20, fontWeight: 900 },
  profileRole: { margin: '4px 0 0', color: '#64748b' },
  label: {
    display: 'grid',
    gap: 7,
    marginTop: 12,
    color: '#334155',
    fontWeight: 800,
    fontSize: 13
  },
  input: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    boxSizing: 'border-box',
    fontSize: 14,
    color: '#0f172a',
    background: '#f8fafc'
  },
  buttonGrid: { display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' },
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
    background: '#0e7490',
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
  toggleTitle: { margin: 0, fontWeight: 900 },
  toggleDesc: { margin: '5px 0 0', color: '#64748b', fontSize: 14, lineHeight: 1.5 },
  toggleOn: {
    width: 62,
    height: 34,
    borderRadius: 999,
    border: 0,
    background: '#0e7490',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
    gap: 14
  },
  quickButton: {
    border: 0,
    background: '#f8fafc',
    borderRadius: 18,
    padding: 18,
    cursor: 'pointer',
    color: '#0f172a',
    display: 'grid',
    gap: 8,
    textAlign: 'left'
  },
  logoutCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)',
    border: '1px solid #fee2e2'
  },
  logoutTitle: { margin: 0, fontSize: 24, fontWeight: 900, color: '#991b1b' },
  logoutText: { color: '#7f1d1d', lineHeight: 1.7 },
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
    maxWidth: 440,
    borderRadius: 30,
    padding: 30,
    boxShadow: '0 30px 90px rgba(2,6,23,0.35)',
    textAlign: 'center'
  },
  modalTitle: { margin: 0, fontSize: 28, fontWeight: 900 },
  modalText: { color: '#64748b', lineHeight: 1.7 },
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