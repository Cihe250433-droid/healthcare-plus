import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Appointments from './pages/Appointments.jsx';
import Billing from './pages/Billing.jsx';
import Settings from './pages/Settings.jsx';

function Layout({ children }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Patients', path: '/patients', icon: '👥' },
    { name: 'Appointments', path: '/appointments', icon: '📅' },
    { name: 'Billing', path: '/billing', icon: '💳' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ]; // fixed typo from previous versions

  return (
    <div style={styles.page}>
      {/* Premium Sidebar */}
      <motion.aside
        style={styles.sidebar}
        initial={{ x: -40, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }} 
      >
        {/* Clickable Animated Logo */}
        <NavLink to="/" style={styles.logoLink}>
          <div style={styles.logoBox}>
            <motion.div
              style={styles.logoIcon}
              animate={{
                y: [0, -6, 0], 
                boxShadow: [
                  '0 12px 28px rgba(6,182,212,0.35)',
                  '0 20px 42px rgba(6,182,212,0.65)',
                  '0 12px 28px rgba(6,182,212,0.35)'
                ]
              }} 
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }} 
              whileHover={{ rotate: 12, scale: 1.12 }} 
              whileTap={{ scale: 0.95 }} 
            >
              <span style={styles.logoPulse}>✚</span>
            </motion.div>

            <div>
              <motion.h2
                style={styles.logoTitle}
                animate={{ opacity: [0.85, 1, 0.85] }} 
                transition={{ duration: 2.4, repeat: Infinity }} 
              >
                HealthCare Plus
              </motion.h2>
              <p style={styles.logoSub}>Smart Care Automation</p>
            </div>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav style={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'} 
              style={({ isActive }) =>
                isActive ? styles.activeNav : styles.navItem
              }
            >
              <motion.span
                style={styles.navInner}
                whileHover={{ x: 6 }} 
                whileTap={{ scale: 0.97 }} 
              >
                <span style={styles.navIcon}>{item.icon}</span>
                <span>{item.name}</span>
              </motion.span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer Card */}
        <motion.div
          style={styles.sidebarCard}
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          whileHover={{ y: -4 }} 
        >
          <p style={styles.cardTitle}>System Health</p>
          <p style={styles.cardText}>
            API, database and frontend are fully operational.
          </p>
          <div style={styles.statusPill}>● Online</div>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main style={styles.main}>
        <motion.div
          style={styles.contentShell}
          initial={{ opacity: 0, y: 18 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.35 }} 
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden'
  },

  /* Sidebar */
  sidebar: {
    width: 300,
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    background:
      'linear-gradient(180deg, #020617 0%, #0f172a 55%, #164e63 100%)',
    color: 'white',
    padding: 26,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '20px 0 60px rgba(15,23,42,0.25)',
    zIndex: 10
  },

  /* Logo */
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  },

  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 38,
    cursor: 'pointer'
  },

  logoIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    background:
      'conic-gradient(from 180deg, #22d3ee, #0891b2, #14b8a6, #22d3ee)',
    display: 'grid',
    placeItems: 'center',
    fontSize: 32,
    fontWeight: 900,
    position: 'relative'
  },

  logoPulse: {
    width: 38,
    height: 38,
    borderRadius: 14,
    background: '#020617',
    color: '#67e8f9',
    display: 'grid',
    placeItems: 'center',
    fontSize: 24,
    fontWeight: 900
  },

  logoTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: '-0.5px'
  },

  logoSub: {
    margin: '5px 0 0',
    color: '#bae6fd',
    fontSize: 13,
    fontWeight: 600
  },

  /* Navigation */
  nav: {
    display: 'grid',
    gap: 12
  },

  navItem: {
    textDecoration: 'none',
    color: '#dbeafe',
    borderRadius: 18,
    fontSize: 15,
    fontWeight: 700,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)'
  },

  activeNav: {
    textDecoration: 'none',
    color: 'white',
    borderRadius: 18,
    fontSize: 15,
    fontWeight: 900,
    background:
      'linear-gradient(135deg, rgba(6,182,212,1), rgba(8,145,178,1))',
    boxShadow: '0 12px 28px rgba(6,182,212,0.35)',
    border: '1px solid rgba(255,255,255,0.22)'
  },

  navInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '15px 17px'
  },

  navIcon: {
    fontSize: 18
  },

  /* Sidebar Footer Card */
  sidebarCard: {
    marginTop: 'auto',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: 26,
    padding: 20,
    backdropFilter: 'blur(14px)'
  },

  cardTitle: {
    margin: 0,
    fontWeight: 900,
    fontSize: 16
  },

  cardText: {
    margin: '8px 0 14px',
    color: '#dbeafe',
    lineHeight: 1.5,
    fontSize: 13
  },

  statusPill: {
    background: 'rgba(34,197,94,0.16)',
    color: '#86efac',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 13,
    display: 'inline-block'
  },

  /* Main Content */
  main: {
    flex: 1,
    minWidth: 0,
    padding: 28
  },

  contentShell: {
    maxWidth: 1440,
    margin: '0 auto',
    width: '100%'
  }
};

export default App;
