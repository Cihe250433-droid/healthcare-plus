import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarDays,
  CreditCard,
  Settings,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Database,
  Route,
  ClipboardList
} from 'lucide-react';
import { getDashboardStats } from '../services/api.js';

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data || {});
      } catch {
        // keep default values if backend is not running
      }
    };

    loadStats();
  }, []);

  const modules = [
    {
      title: 'Patients',
      text: 'Add new patients, fix incorrect details and quickly find saved records.',
      icon: Users,
      path: '/patients'
    },
    {
      title: 'Appointments',
      text: 'Choose a patient, doctor and visit reason, then add the booking to the schedule.',
      icon: CalendarDays,
      path: '/appointments'
    },
    {
      title: 'Billing',
      text: 'Select a care plan, check the price and keep payment records in one place.',
      icon: CreditCard,
      path: '/billing'
    },
    {
      title: 'Settings',
      text: 'Update admin details, use quick links and manage simple system controls.',
      icon: Settings,
      path: '/settings'
    }
  ];

  const builtItems = [
    { icon: Route, text: 'Page navigation' },
    { icon: ClipboardList, text: 'Patient and booking forms' },
    { icon: Database, text: 'Saved records in MongoDB' },
    { icon: CheckCircle2, text: 'Frontend connected to backend' }
  ];

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <motion.div
          style={styles.heroCard}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={styles.label}>
            <HeartPulse size={18} />
            HealthCare Plus
          </div>

          <h1 style={styles.heroTitle}>
            Smarter systems for better patient care.
          </h1>

          <p style={styles.heroText}>
            View today’s patient records, upcoming appointments and active care
            plans.
          </p>

          <div style={styles.heroActions}>
            <button style={styles.primaryButton} onClick={() => navigate('/patients')}>
              Add Patient <ArrowRight size={18} />
            </button>

            <button style={styles.secondaryButton} onClick={() => navigate('/appointments')}>
              Book Appointment
            </button>
          </div>
        </motion.div>

        <motion.div
          style={styles.summaryPanel}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p style={styles.panelLabel}>Current records</p>

          <div style={styles.summaryItem}>
            <span>{stats.totalPatients}</span>
            <div>
              <strong>Patients</strong>
              <small>Records currently saved</small>
            </div>
          </div>

          <div style={styles.summaryItem}>
            <span>{stats.totalAppointments}</span>
            <div>
              <strong>Appointments</strong>
              <small>Visits added to the schedule</small>
            </div>
          </div>

          <div style={styles.summaryItem}>
            <span>{stats.activeSubscriptions}</span>
            <div>
              <strong>Care plans</strong>
              <small>Active subscriptions</small>
            </div>
          </div>

          <div style={styles.revenueBox}>
            <small>Monthly payments recorded</small>
            <strong>${Number(stats.monthlyRevenue || 0).toFixed(2)}</strong>
          </div>
        </motion.div>
      </section>

  
       

      <section style={styles.sectionIntro}>
        <p style={styles.smallLabel}>Main workspace</p>
        <h2>What would you like to manage?</h2>
        <p>
          Use these sections to complete the everyday tasks needed in a small
          healthcare office.
        </p>
      </section>

      <section style={styles.moduleGrid}>
        {modules.map((module, index) => {
          const Icon = module.icon;

          return (
            <motion.div
              key={module.title}
              style={styles.moduleCard}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div style={styles.moduleIcon}>
                <Icon size={26} strokeWidth={2.2} />
              </div>

              <h3>{module.title}</h3>
              <p>{module.text}</p>

              <button style={styles.cardButton} onClick={() => navigate(module.path)}>
                Open {module.title}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </section>

      <section style={styles.bottomGrid}>
        <div style={styles.requirementsCard}>
          <p style={styles.smallLabel}>Project progress</p>
          <h2>What has been built</h2>

          <div style={styles.requirementsGrid}>
            {builtItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.text} style={styles.requirementItem}>
                  <Icon size={22} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.noteCard}>
          <h3>Built for everyday clinic work</h3>
          <p>
            The layout focuses on clear actions, readable information and simple
            navigation so staff can complete tasks quickly.
          </p>

          <button style={styles.noteButton} onClick={() => navigate('/settings')}>
            Go to Settings
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    color: '#0f172a'
  },

  hero: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.8fr',
    gap: 28,
    alignItems: 'stretch',
    marginBottom: 24
  },

  heroCard: {
    background: '#ffffff',
    borderRadius: 34,
    padding: 42,
    boxShadow: '0 18px 45px rgba(15,23,42,0.08)',
    border: '1px solid #e2e8f0'
  },

  label: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: '#ecfeff',
    color: '#0e7490',
    padding: '10px 14px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 13,
    marginBottom: 22
  },

  heroTitle: {
    margin: 0,
    maxWidth: 780,
    fontSize: 50,
    lineHeight: 1.05,
    letterSpacing: '-0.05em',
    fontWeight: 900
  },

  heroText: {
    margin: '20px 0 0',
    maxWidth: 720,
    color: '#475569',
    fontSize: 17,
    lineHeight: 1.85
  },

  heroActions: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    marginTop: 30
  },

  primaryButton: {
    border: 0,
    background: '#0e7490',
    color: 'white',
    padding: '14px 18px',
    borderRadius: 16,
    fontWeight: 900,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer'
  },

  secondaryButton: {
    border: '1px solid #cbd5e1',
    background: 'white',
    color: '#0f172a',
    padding: '14px 18px',
    borderRadius: 16,
    fontWeight: 900,
    cursor: 'pointer'
  },

  summaryPanel: {
    background: '#0f172a',
    color: 'white',
    borderRadius: 34,
    padding: 30,
    boxShadow: '0 18px 45px rgba(15,23,42,0.16)'
  },

  panelLabel: {
    margin: '0 0 18px',
    color: '#67e8f9',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: 12
  },

  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '15px 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    color: '#dbeafe'
  },

  revenueBox: {
    marginTop: 22,
    background: '#111c2f',
    borderRadius: 22,
    padding: 20
  },

  trustBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 18,
    background: '#0e7490',
    color: 'white',
    borderRadius: 26,
    padding: 22,
    marginBottom: 30
  },

  sectionIntro: {
    marginBottom: 18
  },

  smallLabel: {
    margin: 0,
    color: '#0e7490',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: 12
  },

  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))',
    gap: 20,
    marginBottom: 30
  },

  moduleCard: {
    background: 'white',
    borderRadius: 26,
    padding: 24,
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 28px rgba(15,23,42,0.06)'
  },

  moduleIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    background: '#ecfeff',
    color: '#0e7490',
    display: 'grid',
    placeItems: 'center',
    marginBottom: 18
  },

  cardButton: {
    marginTop: 18,
    border: 0,
    background: '#f1f5f9',
    color: '#0f172a',
    padding: '11px 14px',
    borderRadius: 14,
    fontWeight: 900,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer'
  },

  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 0.7fr',
    gap: 22
  },

  requirementsCard: {
    background: 'white',
    borderRadius: 28,
    padding: 28,
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 28px rgba(15,23,42,0.06)'
  },

  requirementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: 14,
    marginTop: 20
  },

  requirementItem: {
    background: '#f8fafc',
    borderRadius: 18,
    padding: 16,
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    fontWeight: 800,
    color: '#334155'
  },

  noteCard: {
    background: '#ffffff',
    borderRadius: 28,
    padding: 28,
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 28px rgba(15,23,42,0.06)'
  },

  noteButton: {
    border: 0,
    background: '#0e7490',
    color: 'white',
    padding: '12px 16px',
    borderRadius: 14,
    fontWeight: 900,
    cursor: 'pointer'
  }
};

export default Dashboard;