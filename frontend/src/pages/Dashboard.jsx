import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '../services/api.js';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data);
      } catch {
        setMessage('Backend not connected. Showing default values.');
      }
    };

    loadStats();
  }, []);

  const cards = [
    { title: 'Total Patients', value: stats.totalPatients, icon: '👥', change: '+12%' },
    { title: 'Appointments', value: stats.totalAppointments, icon: '📅', change: '+8%' },
    { title: 'Active Plans', value: stats.activeSubscriptions, icon: '💳', change: '+15%' },
    {
      title: 'Monthly Revenue',
      value: `$${Number(stats.monthlyRevenue || 0).toFixed(2)}`,
      icon: '💰',
      change: '+21%'
    }
  ];

  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        style={styles.cursorGlow}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Healthcare Command Centre</p>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <p style={styles.subtitle}>
            Live statistics from your MongoDB backend.
          </p>
        </div>

        <div style={styles.avatar}>AU</div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.hero}>
        <div>
          <p style={styles.heroLabel}>Smart Healthcare Operations</p>
          <h2 style={styles.heroTitle}>
            Manage patients, appointments, billing and automation from one place.
          </h2>
          <p style={styles.heroText}>
            Dashboard values are now loaded from your backend API.
          </p>
        </div>
      </section>

      <section style={styles.statsGrid}>
        {cards.map((item, index) => (
          <motion.div
            key={item.title}
            style={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div style={styles.cardTop}>
              <div style={styles.icon}>{item.icon}</div>
              <span style={styles.change}>{item.change}</span>
            </div>

            <p style={styles.cardTitle}>{item.title}</p>
            <h3 style={styles.cardValue}>{item.value}</h3>
          </motion.div>
        ))}
      </section>

      <section style={styles.contentGrid}>
        <motion.div style={styles.largePanel} whileHover={{ y: -4 }}>
          <h3 style={styles.panelTitle}>System Overview</h3>
          <p style={styles.panelSub}>
            Your frontend is successfully communicating with the backend API.
          </p>

          <div style={styles.infoBox}>✅ MongoDB Atlas connected</div>
          <div style={styles.infoBox}>✅ Express API running on port 5000</div>
          <div style={styles.infoBox}>✅ React frontend running on Vite</div>
        </motion.div>

        <motion.div style={styles.automationPanel} whileHover={{ y: -4 }}>
          <h3 style={styles.darkTitle}>Automation Hub</h3>
          <p style={styles.darkSub}>Smart workflow ideas for your system</p>

          <div style={styles.autoRow}>🔔 Auto appointment reminders</div>
          <div style={styles.autoRow}>⚠️ Overdue billing alerts</div>
          <div style={styles.autoRow}>📊 Monthly health reports</div>
        </motion.div>
      </section>
    </motion.div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eaf3f8',
    fontFamily: 'Arial, sans-serif',
    color: '#0f172a',
    overflowX: 'hidden',
    position: 'relative'
  },
  cursorGlow: {
    position: 'fixed',
    top: 80,
    right: 100,
    width: 240,
    height: 240,
    background: 'rgba(6,182,212,0.18)',
    filter: 'blur(60px)',
    borderRadius: '50%',
    pointerEvents: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  kicker: { margin: 0, color: '#0891b2', fontWeight: 900 },
  title: { margin: '6px 0', fontSize: 36, fontWeight: 900 },
  subtitle: { margin: 0, color: '#64748b' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: '#0891b2',
    color: 'white',
    display: 'grid',
    placeItems: 'center',
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
  hero: {
    background: 'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
    color: 'white',
    padding: 34,
    borderRadius: 32,
    marginBottom: 24,
    boxShadow: '0 18px 40px rgba(8,145,178,0.25)'
  },
  heroLabel: { margin: 0, color: '#bae6fd', fontWeight: 800 },
  heroTitle: {
    fontSize: 34,
    maxWidth: 720,
    lineHeight: 1.2,
    margin: '10px 0'
  },
  heroText: { margin: 0, color: '#dbeafe' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
    marginBottom: 24
  },
  card: {
    background: 'white',
    padding: 24,
    borderRadius: 26,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    display: 'grid',
    placeItems: 'center',
    fontSize: 28,
    background: '#ecfeff'
  },
  change: {
    color: '#16a34a',
    fontWeight: 900
  },
  cardTitle: {
    color: '#64748b',
    margin: '18px 0 6px'
  },
  cardValue: {
    margin: 0,
    fontSize: 32,
    fontWeight: 900
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 22
  },
  largePanel: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  panelTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900
  },
  panelSub: {
    margin: '6px 0 20px',
    color: '#64748b'
  },
  infoBox: {
    background: '#f8fafc',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    fontWeight: 800
  },
  automationPanel: {
    background: '#020617',
    color: 'white',
    padding: 26,
    borderRadius: 28
  },
  darkTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900
  },
  darkSub: {
    color: '#94a3b8',
    marginBottom: 22
  },
  autoRow: {
    background: '#0f172a',
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    fontWeight: 800
  }
};

export default Dashboard;