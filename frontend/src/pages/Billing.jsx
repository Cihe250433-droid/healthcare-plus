import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getPatients,
  getSubscriptions,
  createSubscription,
  deleteSubscription
} from '../services/api.js';

function Billing() {
  const [patients, setPatients] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    patient: '',
    planName: 'Premium Care',
    monthlyFee: '',
    billingCycle: 'Monthly',
    startDate: '',
    endDate: '',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
    notes: ''
  });

  const loadData = async () => {
    try {
      const patientsRes = await getPatients();
      const subscriptionsRes = await getSubscriptions();

      setPatients(patientsRes.data.data || []);
      setSubscriptions(subscriptionsRes.data.data || []);
    } catch {
      setMessage('Backend not connected. Check server is running on port 5000.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSubscription({
        ...form,
        monthlyFee: Number(form.monthlyFee)
      });

      setMessage('Subscription created successfully.');

      setForm({
        patient: '',
        planName: 'Premium Care',
        monthlyFee: '',
        billingCycle: 'Monthly',
        startDate: '',
        endDate: '',
        paymentStatus: 'Paid',
        subscriptionStatus: 'Active',
        notes: ''
      });

      loadData();
    } catch {
      setMessage('Failed to create subscription. Check all required fields.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
      setMessage('Subscription deleted successfully.');
      loadData();
    } catch {
      setMessage('Failed to delete subscription.');
    }
  };

  const totalRevenue = subscriptions.reduce((total, item) => {
    if (item.paymentStatus === 'Paid') {
      return total + Number(item.monthlyFee || 0);
    }
    return total;
  }, 0);

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Billing Centre</p>
          <h1 style={styles.title}>Subscription & Billing</h1>
          <p style={styles.subtitle}>
            Manage patient subscriptions, invoices and payment status.
          </p>
        </div>

        <div style={styles.revenueBadge}>💰 ${totalRevenue.toFixed(2)}</div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.summaryGrid}>
        <motion.div style={styles.summaryCard} whileHover={{ y: -6 }}>
          <p style={styles.summaryLabel}>Total Subscriptions</p>
          <h2 style={styles.summaryValue}>{subscriptions.length}</h2>
        </motion.div>

        <motion.div style={styles.summaryCard} whileHover={{ y: -6 }}>
          <p style={styles.summaryLabel}>Paid Revenue</p>
          <h2 style={styles.summaryValue}>${totalRevenue.toFixed(2)}</h2>
        </motion.div>

        <motion.div style={styles.summaryCard} whileHover={{ y: -6 }}>
          <p style={styles.summaryLabel}>Active Plans</p>
          <h2 style={styles.summaryValue}>
            {subscriptions.filter((item) => item.subscriptionStatus === 'Active').length}
          </h2>
        </motion.div>
      </section>

      <section style={styles.grid}>
        <motion.form
          style={styles.formCard}
          onSubmit={handleSubmit}
          whileHover={{ y: -4 }}
        >
          <h2 style={styles.cardTitle}>Create Subscription</h2>
          <p style={styles.cardSub}>Assign a billing plan to a patient.</p>

          <select
            style={styles.inputFull}
            name="patient"
            value={form.patient}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>

          <div style={styles.formGrid}>
            <select
              style={styles.input}
              name="planName"
              value={form.planName}
              onChange={handleChange}
              required
            >
              <option>Basic Care</option>
              <option>Premium Care</option>
              <option>Family Care</option>
            </select>

            <input
              style={styles.input}
              name="monthlyFee"
              type="number"
              placeholder="Monthly Fee"
              value={form.monthlyFee}
              onChange={handleChange}
              required
            />

            <select
              style={styles.input}
              name="billingCycle"
              value={form.billingCycle}
              onChange={handleChange}
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>

            <input
              style={styles.input}
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
            />

            <select
              style={styles.input}
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>

            <select
              style={styles.input}
              name="subscriptionStatus"
              value={form.subscriptionStatus}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Cancelled</option>
              <option>Expired</option>
            </select>
          </div>

          <textarea
            style={styles.textarea}
            name="notes"
            placeholder="Billing notes"
            value={form.notes}
            onChange={handleChange}
          />

          <motion.button
            style={styles.primaryButton}
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Save Subscription
          </motion.button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <h2 style={styles.cardTitle}>Billing Records</h2>
          <p style={styles.cardSub}>Track subscriptions and payment status.</p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Fee</th>
                  <th style={styles.th}>Payment</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.length === 0 ? (
                  <tr>
                    <td style={styles.empty} colSpan="6">
                      No billing records found. Create one using the form.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((item) => (
                    <tr key={item._id}>
                      <td style={styles.td}>
                        {item.patient?.firstName} {item.patient?.lastName}
                      </td>
                      <td style={styles.td}>{item.planName}</td>
                      <td style={styles.td}>${Number(item.monthlyFee).toFixed(2)}</td>
                      <td style={styles.td}>
                        <span style={getPaymentStyle(item.paymentStatus)}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={getPlanStatusStyle(item.subscriptionStatus)}>
                          {item.subscriptionStatus}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          type="button"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.section>
      </section>
    </motion.div>
  );
}

function getPaymentStyle(status) {
  if (status === 'Paid') return styles.paid;
  if (status === 'Overdue') return styles.overdue;
  return styles.pending;
}

function getPlanStatusStyle(status) {
  if (status === 'Active') return styles.active;
  if (status === 'Cancelled') return styles.cancelled;
  return styles.expired;
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
  revenueBadge: {
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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 18,
    marginBottom: 24
  },
  summaryCard: {
    background: 'white',
    padding: 22,
    borderRadius: 24,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  summaryLabel: {
    margin: 0,
    color: '#64748b',
    fontWeight: 700
  },
  summaryValue: {
    margin: '8px 0 0',
    fontSize: 30,
    fontWeight: 900
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.5fr',
    gap: 24,
    alignItems: 'start'
  },
  formCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  tableCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)'
  },
  cardTitle: { margin: 0, fontSize: 24, fontWeight: 900 },
  cardSub: { margin: '8px 0 20px', color: '#64748b' },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 14
  },
  input: {
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    fontSize: 14,
    outlineColor: '#0891b2'
  },
  inputFull: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    fontSize: 14,
    marginBottom: 14,
    boxSizing: 'border-box',
    outlineColor: '#0891b2'
  },
  textarea: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    fontSize: 14,
    marginTop: 14,
    minHeight: 100,
    boxSizing: 'border-box',
    outlineColor: '#0891b2'
  },
  primaryButton: {
    width: '100%',
    border: 0,
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    padding: 15,
    borderRadius: 16,
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: 14
  },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    padding: 14,
    background: '#f8fafc',
    color: '#475569',
    fontSize: 14
  },
  td: {
    padding: 14,
    borderBottom: '1px solid #e2e8f0'
  },
  paid: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  pending: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  overdue: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  active: {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  cancelled: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  expired: {
    background: '#e2e8f0',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12
  },
  deleteButton: {
    border: 0,
    background: '#fee2e2',
    color: '#991b1b',
    padding: '9px 12px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer'
  },
  empty: {
    textAlign: 'center',
    padding: 30,
    color: '#64748b'
  }
};

export default Billing;