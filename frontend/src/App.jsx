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
  ];

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.logoBox}>
          <div style={styles.logoIcon}>+</div>
          <div>
            <h2 style={styles.logoTitle}>HealthCare Plus</h2>
            <p style={styles.logoSub}>Smart Admin Portal</p>
          </div>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) =>
                isActive ? styles.activeNav : styles.navItem
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>{children}</main>
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
    background: '#eaf3f8',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: 290,
    background: 'linear-gradient(180deg, #020617, #164e63)',
    color: 'white',
    padding: 26,
    boxSizing: 'border-box'
  },
  logoBox: {
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    marginBottom: 36
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    background: '#06b6d4',
    display: 'grid',
    placeItems: 'center',
    fontSize: 32,
    fontWeight: 900
  },
  logoTitle: { margin: 0, fontSize: 22 },
  logoSub: { margin: '4px 0 0', color: '#bae6fd', fontSize: 13 },
  nav: { display: 'grid', gap: 12 },
  navItem: {
    textDecoration: 'none',
    color: '#dbeafe',
    padding: '14px 16px',
    borderRadius: 16,
    fontSize: 15
  },
  activeNav: {
    textDecoration: 'none',
    color: 'white',
    background: '#06b6d4',
    padding: '14px 16px',
    borderRadius: 16,
    fontWeight: 800,
    fontSize: 15
  },
  main: {
    flex: 1,
    padding: 30
  }
};

export default App;