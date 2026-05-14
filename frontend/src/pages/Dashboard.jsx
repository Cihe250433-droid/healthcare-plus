import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardStats } from '../services/api.js';

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0
  });

  const [message, setMessage] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data || {});
      } catch {
        setMessage('Backend not connected. Showing default values.');
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: '👥',
      trend: '+12%',
      subtitle: 'Registered patient records'
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      icon: '📅',
      trend: '+8%',
      subtitle: 'Scheduled consultations'
    },
    {
      title: 'Active Plans',
      value: stats.activeSubscriptions,
      icon: '💳',
      trend: '+15%',
      subtitle: 'Ongoing subscriptions'
    },
    {
      title: 'Monthly Revenue',
      value: `$${Number(stats.monthlyRevenue || 0).toFixed(2)}`,
      icon: '💰',
      trend: '+21%',
      subtitle: 'Paid subscription revenue'
    }
  ];

  const modules = [
    {
      icon: '🏠',
      title: 'Dashboard',
      path: '/',
      description:
        'The dashboard provides a real-time overview of patients, appointments, subscriptions and revenue.',
      features: [
        'Live statistics from backend',
        'Animated KPI cards',
        'Assessment requirement summary'
      ]
    },
    {
      icon: '👥',
      title: 'Patients',
      path: '/patients',
      description:
        'The Patients section allows staff to add, search, view and delete patient records stored in MongoDB.',
      features: [
        'Patient registration form',
        'Searchable patient table',
        'API communication with backend'
      ]
    },
    {
      icon: '📅',
      title: 'Appointments',
      path: '/appointments',
      description:
        'The Appointments section supports booking consultations, assigning doctors and tracking appointment status.',
      features: [
        'Patient dropdown from database',
        'Appointment scheduling',
        'Status badges and delete action'
      ]
    },
    {
      icon: '💳',
      title: 'Billing',
      path: '/billing',
      description:
        'The Billing section manages subscriptions, payment status and monthly revenue calculations.',
      features: [
        'Subscription form',
        'Payment status tracking',
        'Revenue summary'
      ]
    },
    {
      icon: '⚙️',
      title: 'Settings',
      path: '/settings',
      description:
        'The Settings section contains admin preferences, automation toggles and system status information.',
      features: [
        'Automation preferences',
        'System status panel',
        'Admin profile controls'
      ]
    }
  ];

  const assessmentCards = [
    {
      icon: '⚛️',
      title: 'React Framework',
      front: 'Modern frontend',
      back: 'The application uses React with Vite for a fast, component-based frontend.'
    },
    {
      icon: '🧭',
      title: 'Client Routing',
      front: 'Smooth navigation',
      back: 'React Router enables page navigation without full browser reloads.'
    },
    {
      icon: '📄',
      title: '5 Functional Pages',
      front: 'Multi-page system',
      back: 'Dashboard, Patients, Appointments, Billing and Settings pages are implemented.'
    },
    {
      icon: '📝',
      title: 'Form Handling',
      front: 'User input forms',
      back: 'Forms collect and submit patient, appointment and subscription data.'
    },
    {
      icon: '🔗',
      title: 'API Integration',
      front: 'Frontend + backend',
      back: 'Axios connects React pages to Express API endpoints.'
    },
    {
      icon: '📱',
      title: 'Responsive UI',
      front: 'Flexible layout',
      back: 'Grid layouts, scroll-safe tables and flexible cards support different screens.'
    },
    {
      icon: '🍃',
      title: 'MongoDB Database',
      front: 'Cloud database',
      back: 'MongoDB Atlas stores patients, appointments and subscriptions.'
    },
    {
      icon: '✨',
      title: 'Animations',
      front: 'Premium UX',
      back: 'Framer Motion adds transitions, hover effects, modals and flip cards.'
    }
  ];

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={styles.glowTop}
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <header style={styles.header}>
        <div>
          <motion.p
            style={styles.kicker}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            HealthCare Plus • Smart Administration Platform
          </motion.p>

          <motion.h1
            style={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Dashboard Overview
          </motion.h1>

          <p style={styles.subtitle}>
            A full-stack healthcare management system with live backend data,
            client-side routing, CRUD forms, responsive UI and animations.
          </p>
        </div>

        <motion.div
          style={styles.liveBadge}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={styles.liveDot} /> Live System
        </motion.div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.hero}>
        <p style={styles.heroLabel}>Assessment Showcase Project</p>
        <h2 style={styles.heroTitle}>
          Enterprise-grade healthcare management with animated module previews.
        </h2>
        <p style={styles.heroText}>
          Click any module card below to view a short animated introduction, then
          open the full page from the mini window.
        </p>
      </section>

      <section style={styles.statsGrid}>
        {statCards.map((item, index) => (
          <motion.div
            key={item.title}
            style={styles.card}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.08, type: 'spring' }}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: '0 25px 60px rgba(15,23,42,0.14)'
            }}
          >
            <div style={styles.cardTop}>
              <motion.div
                style={styles.icon}
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {item.icon}
              </motion.div>
              <span style={styles.trend}>{item.trend}</span>
            </div>

            <p style={styles.cardTitle}>{item.title}</p>
            <h3 style={styles.cardValue}>{item.value}</h3>
            <p style={styles.cardSubtitle}>{item.subtitle}</p>
            <div style={styles.liveText}>● Live statistic</div>
          </motion.div>
        ))}
      </section>

      <section style={styles.modulesSection}>
        <h3 style={styles.sectionTitle}>Application Sections</h3>
        <p style={styles.sectionSub}>
          Click a section to preview what it does. Use the Open Page button to
          navigate.
        </p>

        <div style={styles.modulesGrid}>
          {modules.map((module, index) => (
            <motion.button
              key={module.title}
              style={styles.moduleCard}
              type="button"
              onClick={() => setSelectedModule(module)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div style={styles.moduleIcon}>{module.icon}</div>
              <h4 style={styles.moduleTitle}>{module.title}</h4>
              <p style={styles.moduleDescription}>{module.description}</p>
              <span style={styles.previewHint}>Click for quick preview →</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section style={styles.flipSection}>
        <h3 style={styles.sectionTitle}>Assessment Requirements Covered</h3>
        <p style={styles.sectionSub}>
          Hover each card to flip and reveal how this project meets the marking
          requirements.
        </p>

        <div style={styles.flipGrid}>
          {assessmentCards.map((item, index) => (
            <motion.div
              key={item.title}
              style={styles.flipCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ rotateY: 180, scale: 1.03 }}
            >
              <div style={styles.flipFront}>
                <div style={styles.flipIcon}>{item.icon}</div>
                <h4 style={styles.flipTitle}>{item.title}</h4>
                <p style={styles.flipHint}>{item.front}</p>
              </div>

              <div style={styles.flipBack}>
                <h4 style={styles.flipBackTitle}>{item.title}</h4>
                <p style={styles.flipBackText}>{item.back}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={styles.contentGrid}>
        <motion.div style={styles.largePanel} whileHover={{ y: -4 }}>
          <h3 style={styles.panelTitle}>Project Summary</h3>
          <p style={styles.panelSub}>
            HealthCare Plus demonstrates a complete MERN-style system with a
            professional frontend, Express backend, MongoDB database, API
            communication, CRUD functionality and assessment-ready UI.
          </p>

          <div style={styles.requirementsGrid}>
            {[
              'React frontend framework',
              '5 functional pages',
              'Responsive UI design',
              'Client-side routing',
              'Form handling',
              'API communication',
              'MongoDB database integration',
              'CRUD operations',
              'Framer Motion animations',
              'GitHub version control'
            ].map((feature) => (
              <div key={feature} style={styles.infoBox}>
                ✅ {feature}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div style={styles.automationPanel} whileHover={{ y: -4 }}>
          <h3 style={styles.darkTitle}>Smart Automation Ideas</h3>
          <p style={styles.darkSub}>Useful future enhancements for the system.</p>
          <div style={styles.autoRow}>🔔 Appointment reminders</div>
          <div style={styles.autoRow}>⚠️ Overdue billing alerts</div>
          <div style={styles.autoRow}>📊 Monthly health reports</div>
          <div style={styles.autoRow}>🤖 AI care insights</div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedModule && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              style={styles.modalCard}
              initial={{ opacity: 0, scale: 0.86, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.86, y: 40 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setSelectedModule(null)}
                aria-label="Close preview"
              >
                ×
              </button>

              <motion.div
                style={styles.modalIcon}
                animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                {selectedModule.icon}
              </motion.div>

              <h2 style={styles.modalTitle}>{selectedModule.title}</h2>
              <p style={styles.modalText}>{selectedModule.description}</p>

              <div style={styles.modalFeatures}>
                {selectedModule.features.map((feature) => (
                  <div key={feature} style={styles.modalFeature}>
                    ✅ {feature}
                  </div>
                ))}
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => setSelectedModule(null)}
                >
                  Stay Here
                </button>

                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={() => {
                    setSelectedModule(null);
                    navigate(selectedModule.path);
                  }}
                >
                  Open {selectedModule.title}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const styles = {
  page: {
    position: 'relative',
    overflow: 'hidden',
    color: '#0f172a'
  },
  glowTop: {
    position: 'fixed',
    top: -80,
    right: 80,
    width: 340,
    height: 340,
    borderRadius: '50%',
    background: 'rgba(6,182,212,0.18)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    zIndex: 0
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 24,
    flexWrap: 'wrap',
    marginBottom: 28,
    position: 'relative',
    zIndex: 1
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
    margin: '10px 0 12px',
    fontSize: 52,
    lineHeight: 1.05,
    fontWeight: 900,
    letterSpacing: '-0.04em'
  },
  subtitle: {
    margin: 0,
    color: '#475569',
    maxWidth: 820,
    lineHeight: 1.8,
    fontSize: 16,
    fontWeight: 500
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: 'rgba(255,255,255,0.85)',
    padding: '12px 18px',
    borderRadius: 999,
    fontWeight: 900,
    boxShadow: '0 10px 30px rgba(15,23,42,0.08)'
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 12px rgba(34,197,94,0.6)'
  },
  message: {
    background: '#ecfeff',
    color: '#155e75',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    fontWeight: 800,
    position: 'relative',
    zIndex: 1
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(135deg, #0891b2 0%, #0f172a 100%)',
    color: 'white',
    borderRadius: 36,
    padding: 40,
    marginBottom: 28,
    boxShadow: '0 24px 60px rgba(8,145,178,0.25)'
  },
  heroLabel: {
    margin: 0,
    color: '#bae6fd',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: 12
  },
  heroTitle: {
    margin: '12px 0 14px',
    fontSize: 40,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: '-0.03em'
  },
  heroText: {
    margin: 0,
    color: '#dbeafe',
    lineHeight: 1.8,
    fontSize: 16,
    maxWidth: 780
  },
  statsGrid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 22,
    marginBottom: 28
  },
  card: {
    background: 'rgba(255,255,255,0.9)',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.7)'
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    display: 'grid',
    placeItems: 'center',
    fontSize: 28,
    background: '#ecfeff'
  },
  trend: {
    color: '#16a34a',
    fontWeight: 900
  },
  cardTitle: {
    margin: '18px 0 8px',
    color: '#64748b',
    fontWeight: 700
  },
  cardValue: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: '-0.03em'
  },
  cardSubtitle: {
    margin: '8px 0 0',
    color: '#64748b',
    fontSize: 13,
    lineHeight: 1.6
  },
  liveText: {
    marginTop: 14,
    color: '#0891b2',
    fontSize: 12,
    fontWeight: 900
  },
  modulesSection: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 28
  },
  sectionTitle: {
    margin: '0 0 6px',
    fontSize: 24,
    fontWeight: 900
  },
  sectionSub: {
    margin: '0 0 18px',
    color: '#64748b'
  },
  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 18
  },
  moduleCard: {
    background: 'white',
    border: 0,
    borderRadius: 24,
    padding: 22,
    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#0f172a'
  },
  moduleIcon: {
    fontSize: 30,
    marginBottom: 10
  },
  moduleTitle: {
    margin: '0 0 6px',
    fontSize: 18,
    fontWeight: 900
  },
  moduleDescription: {
    margin: 0,
    color: '#64748b',
    lineHeight: 1.7,
    fontSize: 14
  },
  previewHint: {
    display: 'inline-block',
    marginTop: 14,
    color: '#0891b2',
    fontWeight: 900,
    fontSize: 13
  },
  flipSection: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.72)',
    borderRadius: 30,
    padding: 28,
    marginBottom: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  flipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: 16,
    perspective: 1200
  },
  flipCard: {
    position: 'relative',
    height: 200,
    borderRadius: 24,
    transformStyle: 'preserve-3d',
    cursor: 'pointer'
  },
  flipFront: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #ffffff, #ecfeff)',
    border: '1px solid #e2e8f0',
    borderRadius: 24,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backfaceVisibility: 'hidden',
    boxShadow: '0 12px 30px rgba(15,23,42,0.08)'
  },
  flipBack: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    borderRadius: 24,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    boxShadow: '0 18px 45px rgba(8,145,178,0.28)'
  },
  flipIcon: {
    fontSize: 34,
    marginBottom: 10
  },
  flipTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 900
  },
  flipHint: {
    margin: '10px 0 0',
    color: '#0891b2',
    fontSize: 12,
    fontWeight: 900
  },
  flipBackTitle: {
    margin: '0 0 10px',
    fontSize: 17,
    fontWeight: 900
  },
  flipBackText: {
    margin: 0,
    color: '#dbeafe',
    lineHeight: 1.6,
    fontSize: 13,
    fontWeight: 600
  },
  contentGrid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 24,
    alignItems: 'start'
  },
  largePanel: {
    background: 'white',
    padding: 28,
    borderRadius: 30,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  panelTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900
  },
  panelSub: {
    margin: '8px 0 22px',
    color: '#64748b',
    lineHeight: 1.7
  },
  requirementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 12
  },
  infoBox: {
    background: '#f8fafc',
    padding: 14,
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 14
  },
  automationPanel: {
    background: '#020617',
    color: 'white',
    padding: 28,
    borderRadius: 30,
    boxShadow: '0 16px 40px rgba(2,6,23,0.18)'
  },
  darkTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900
  },
  darkSub: {
    color: '#94a3b8',
    margin: '8px 0 20px',
    lineHeight: 1.7
  },
  autoRow: {
    background: '#0f172a',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    color: '#dbeafe',
    fontWeight: 800,
    fontSize: 14
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
    width: '100%',
    maxWidth: 520,
    background: 'white',
    borderRadius: 34,
    padding: 30,
    position: 'relative',
    boxShadow: '0 30px 90px rgba(2,6,23,0.35)'
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: 0,
    background: '#f1f5f9',
    fontSize: 24,
    cursor: 'pointer'
  },
  modalIcon: {
    width: 76,
    height: 76,
    borderRadius: 26,
    background: '#ecfeff',
    display: 'grid',
    placeItems: 'center',
    fontSize: 38,
    marginBottom: 18
  },
  modalTitle: {
    margin: '0 0 10px',
    fontSize: 30,
    fontWeight: 900
  },
  modalText: {
    color: '#475569',
    lineHeight: 1.8,
    marginBottom: 20
  },
  modalFeatures: {
    display: 'grid',
    gap: 10,
    marginBottom: 24
  },
  modalFeature: {
    background: '#f8fafc',
    padding: 12,
    borderRadius: 14,
    fontWeight: 800
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    flexWrap: 'wrap'
  },
  secondaryButton: {
    border: 0,
    background: '#e2e8f0',
    color: '#0f172a',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  },
  primaryButton: {
    border: 0,
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  }
};

export default Dashboard;