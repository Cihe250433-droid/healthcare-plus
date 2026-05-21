import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  CreditCard,
  Settings,
  HeartPulse,
  HelpCircle
} from 'lucide-react';

import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Appointments from './pages/Appointments.jsx';
import Billing from './pages/Billing.jsx';
import SettingsPage from './pages/Settings.jsx';

function Layout({ children }) {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Appointments', path: '/appointments', icon: CalendarDays },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <div style={styles.page}>
      <motion.aside
        style={styles.sidebar}
        initial={{ x: -35, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <NavLink to="/" style={styles.logoLink}>
          <div style={styles.logoBox}>
            <motion.div
              style={styles.logoIcon}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              whileHover={{ scale: 1.06 }}
            >
              <HeartPulse size={30} strokeWidth={2.4} />
            </motion.div>

            <div>
              <h2 style={styles.logoTitle}>HealthCare Plus</h2>
              <p style={styles.logoSub}>Clinic Admin System</p>
            </div>
          </div>
        </NavLink>

        <nav style={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
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
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                  <span>{item.name}</span>
                </motion.span>
              </NavLink>
            );
          })}
        </nav>

        <div style={styles.sidebarHelp}>
          <HelpCircle size={18} strokeWidth={2.2} />
          <div>
            <strong>Need to update records?</strong>
            <p>Use Patients, Appointments or Billing from the menu.</p>
          </div>
        </div>
      </motion.aside>

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
          <Route path="/settings" element={<SettingsPage />} />
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
    overflowX: 'hidden',
    background: '#f8fafc',
    color: '#0f172a'
  },

  sidebar: {
    width: 300,
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    background: '#0f172a',
    color: 'white',
    padding: 26,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '18px 0 48px rgba(15,23,42,0.18)',
    zIndex: 10
  },

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
    borderRadius: 18,
    background: '#0e7490',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 14px 30px rgba(14,116,144,0.35)'
  },

  logoTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: '-0.5px'
  },

  logoSub: {
    margin: '5px 0 0',
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: 600
  },

  nav: {
    display: 'grid',
    gap: 10
  },

  navItem: {
    textDecoration: 'none',
    color: '#cbd5e1',
    borderRadius: 16,
    fontSize: 15,
    fontWeight: 750,
    background: 'transparent',
    border: '1px solid transparent'
  },

  activeNav: {
    textDecoration: 'none',
    color: 'white',
    borderRadius: 16,
    fontSize: 15,
    fontWeight: 900,
    background: '#0e7490',
    boxShadow: '0 12px 26px rgba(14,116,144,0.28)',
    border: '1px solid rgba(255,255,255,0.12)'
  },

  navInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px'
  },

  sidebarHelp: {
    marginTop: 'auto',
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    background: '#111c2f',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 22,
    padding: 18,
    color: '#cbd5e1'
  },

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