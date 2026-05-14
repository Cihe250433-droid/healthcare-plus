import { motion } from 'framer-motion';

function Dashboard() {
  const stats = [
    { title: 'Total Patients', value: '124', icon: '👥', change: '+12%' },
    { title: 'Today Appointments', value: '38', icon: '📅', change: '+8%' },
    { title: 'Active Plans', value: '86', icon: '💳', change: '+15%' },
    { title: 'Monthly Revenue', value: '$7,840', icon: '💰', change: '+21%' }
  ];

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.cursorGlow}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p style={styles.kicker}>Healthcare Command Centre</p>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <p style={styles.subtitle}>
            Real-time operations, patient care and automation insights.
          </p>
        </div>

        <div style={styles.headerRight}>
          <motion.div style={styles.search} whileHover={{ scale: 1.03 }}>
            Search patients, doctors, invoices...
          </motion.div>
          <motion.div style={styles.avatar} whileHover={{ scale: 1.1 }}>
            AU
          </motion.div>
        </div>
      </motion.header>

      <motion.section
        style={styles.hero}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p style={styles.heroLabel}>Smart Healthcare Operations</p>
          <h2 style={styles.heroTitle}>
            Automate appointments, billing alerts and patient follow-ups.
          </h2>
          <p style={styles.heroText}>
            This dashboard connects with your backend APIs and MongoDB data.
          </p>
        </div>

        <div style={styles.heroActions}>
          <motion.button style={styles.whiteButton} whileHover={{ scale: 1.06 }}>
            Generate Report
          </motion.button>
          <motion.button style={styles.darkButton} whileHover={{ scale: 1.06 }}>
            Run Automation
          </motion.button>
        </div>
      </motion.section>

      <section style={styles.statsGrid}>
        {stats.map((item, index) => (
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
          <h3 style={styles.panelTitle}>Upcoming Appointments</h3>
          <p style={styles.panelSub}>Today’s patient schedule</p>

          {[
            ['John Doe', 'Dr Sarah Williams', '10:30 AM', 'Scheduled'],
            ['Mary Smith', 'Dr James Carter', '12:00 PM', 'Completed'],
            ['Alex Brown', 'Dr Emily White', '02:15 PM', 'Scheduled']
          ].map((row) => (
            <motion.div
              key={row[0]}
              style={styles.appointmentRow}
              whileHover={{ x: 8 }}
            >
              <div>
                <p style={styles.patientName}>{row[0]}</p>
                <p style={styles.doctorName}>{row[1]}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={styles.time}>{row[2]}</p>
                <span style={row[3] === 'Completed' ? styles.completed : styles.scheduled}>
                  {row[3]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={styles.automationPanel} whileHover={{ y: -4 }}>
          <h3 style={styles.darkTitle}>Automation Hub</h3>
          <p style={styles.darkSub}>Smart tasks running in the background</p>

          {[
            ['🔔', 'Auto appointment reminders', 'Active'],
            ['⚠️', 'Overdue billing alerts', 'Active'],
            ['📊', 'Monthly health report', 'Scheduled']
          ].map((item) => (
            <motion.div key={item[1]} style={styles.autoRow} whileHover={{ x: 8 }}>
              <span style={styles.autoIcon}>{item[0]}</span>
              <div>
                <p style={styles.autoTitle}>{item[1]}</p>
                <p style={styles.autoStatus}>{item[2]}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
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
  kicker: { margin: 0, color: '#0891b2', fontWeight: 800 },
  title: { margin: '6px 0', fontSize: 36, fontWeight: 900 },
  subtitle: { margin: 0, color: '#64748b' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 14 },
  search: {
    background: 'white',
    padding: '14px 22px',
    borderRadius: 16,
    color: '#94a3b8',
    boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
    minWidth: 300
  },
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
  hero: {
    background: 'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
    color: 'white',
    padding: 34,
    borderRadius: 32,
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 18px 40px rgba(8,145,178,0.25)'
  },
  heroLabel: { margin: 0, color: '#bae6fd', fontWeight: 800 },
  heroTitle: { fontSize: 34, maxWidth: 720, lineHeight: 1.2, margin: '10px 0' },
  heroText: { margin: 0, color: '#dbeafe' },
  heroActions: { display: 'flex', gap: 12 },
  whiteButton: {
    border: 0,
    background: 'white',
    padding: '14px 18px',
    borderRadius: 14,
    fontWeight: 800
  },
  darkButton: {
    border: '1px solid #67e8f9',
    background: '#0f172a',
    color: 'white',
    padding: '14px 18px',
    borderRadius: 14,
    fontWeight: 800
  },
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
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  icon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    display: 'grid',
    placeItems: 'center',
    fontSize: 28,
    background: '#ecfeff'
  },
  change: { color: '#16a34a', fontWeight: 900 },
  cardTitle: { color: '#64748b', margin: '18px 0 6px' },
  cardValue: { margin: 0, fontSize: 32, fontWeight: 900 },
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
  panelTitle: { margin: 0, fontSize: 22 },
  panelSub: { margin: '6px 0 20px', color: '#64748b' },
  appointmentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#f8fafc',
    padding: 18,
    borderRadius: 20,
    marginBottom: 14
  },
  patientName: { margin: 0, fontWeight: 900 },
  doctorName: { margin: '6px 0 0', color: '#64748b' },
  time: { margin: '0 0 8px', fontWeight: 900 },
  scheduled: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 12
  },
  completed: {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 12
  },
  automationPanel: {
    background: '#020617',
    color: 'white',
    padding: 26,
    borderRadius: 28
  },
  darkTitle: { margin: 0, fontSize: 22 },
  darkSub: { color: '#94a3b8', marginBottom: 22 },
  autoRow: {
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    background: '#0f172a',
    padding: 15,
    borderRadius: 18,
    marginBottom: 12
  },
  autoIcon: { fontSize: 24 },
  autoTitle: { margin: 0, fontWeight: 800 },
  autoStatus: { margin: '4px 0 0', color: '#67e8f9', fontSize: 13 }
};

export default Dashboard;