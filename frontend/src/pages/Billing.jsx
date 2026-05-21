import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Trash2, Save } from 'lucide-react';
import {
  getPatients,
  getSubscriptions,
  createSubscription,
  deleteSubscription
} from '../services/api.js';

function Billing() {
  const planPrices = {
    'Basic Care': 49.99,
    'Premium Care': 89.99,
    'Family Care': 129.99
  };

  const emptyForm = {
    patient: '',
    planName: 'Premium Care',
    monthlyFee: planPrices['Premium Care'],
    billingCycle: 'Monthly',
    startDate: '',
    endDate: '',
    paymentStatus: 'Paid',
    subscriptionStatus: 'Active',
    notes: ''
  };

  const [patients, setPatients] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [patientsRes, subscriptionsRes] = await Promise.all([getPatients(), getSubscriptions()]);
      setPatients(patientsRes.data.data || []);
      setSubscriptions(subscriptionsRes.data.data || []);
    } catch {
      setMessage('Could not load billing records. Please check the backend server.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'planName') {
      setForm({ ...form, planName: value, monthlyFee: planPrices[value] });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSubscription({ ...form, monthlyFee: Number(form.monthlyFee) });
      setMessage('Care plan added.');
      setForm(emptyForm);
      loadData();
    } catch {
      setMessage('Could not save billing record.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
      setMessage('Billing record removed.');
      loadData();
    } catch {
      setMessage('Could not delete billing record.');
    }
  };

  const totalRevenue = subscriptions.reduce((total, item) => {
    if (item.paymentStatus === 'Paid') return total + Number(item.monthlyFee || 0);
    return total;
  }, 0);

  const getPatientName = (subscription) => {
    if (!subscription.patient) return 'Unknown patient';
    if (typeof subscription.patient === 'object') {
      return `${subscription.patient.firstName || ''} ${subscription.patient.lastName || ''}`.trim();
    }
    return 'Patient record';
  };

  return (
    <motion.div style={styles.page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Billing</p>
          <h1 style={styles.title}>Care Plans</h1>
          <p style={styles.subtitle}>
            Assign care plans, confirm prices and keep payment records together.
          </p>
        </div>

        <div style={styles.badge}>
          <CreditCard size={18} />
          ${totalRevenue.toFixed(2)}
        </div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form style={styles.formCard} onSubmit={handleSubmit} whileHover={{ y: -4 }}>
          <h2 style={styles.cardTitle}>Add care plan</h2>
          <p style={styles.cardSub}>Choose a plan and the price will fill in automatically.</p>

          <label style={styles.labelFull}>
            Patient
            <select style={styles.input} name="patient" value={form.patient} onChange={handleChange} required>
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </label>

          <div style={styles.formGrid}>
            <label style={styles.label}>
              Care plan
              <select style={styles.input} name="planName" value={form.planName} onChange={handleChange}>
                <option>Basic Care</option>
                <option>Premium Care</option>
                <option>Family Care</option>
              </select>
            </label>

            <label style={styles.label}>
              Monthly price
              <input style={styles.input} name="monthlyFee" type="number" step="0.01" value={form.monthlyFee} onChange={handleChange} />
            </label>

            <label style={styles.label}>
              Billing cycle
              <select style={styles.input} name="billingCycle" value={form.billingCycle} onChange={handleChange}>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </label>

            <label style={styles.label}>
              Start date
              <input style={styles.input} type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              End date
              <input style={styles.input} type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            </label>

            <label style={styles.label}>
              Payment
              <select style={styles.input} name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
            </label>

            <label style={styles.label}>
              Plan status
              <select style={styles.input} name="subscriptionStatus" value={form.subscriptionStatus} onChange={handleChange}>
                <option>Active</option>
                <option>Cancelled</option>
                <option>Expired</option>
              </select>
            </label>
          </div>

          <div style={styles.pricePreview}>
            <div>
              <small>Selected plan</small>
              <strong>{form.planName}</strong>
            </div>
            <span>${Number(form.monthlyFee || 0).toFixed(2)}</span>
          </div>

          <label style={styles.labelFull}>
            Notes
            <textarea style={styles.textarea} name="notes" value={form.notes} onChange={handleChange} />
          </label>

          <button type="submit" style={styles.primaryButton}>
            <Save size={17} /> Save care plan
          </button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <h2 style={styles.cardTitle}>Billing records</h2>
          <p style={styles.cardSub}>Check care plans and payment status.</p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Plan</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Payment</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 ? (
                  <tr><td style={styles.empty} colSpan="6">No billing records added yet.</td></tr>
                ) : (
                  subscriptions.map((item) => (
                    <tr key={item._id}>
                      <td style={styles.td}>{getPatientName(item)}</td>
                      <td style={styles.td}>{item.planName}</td>
                      <td style={styles.td}>${Number(item.monthlyFee || 0).toFixed(2)}</td>
                      <td style={styles.td}><span style={getPaymentStyle(item.paymentStatus)}>{item.paymentStatus}</span></td>
                      <td style={styles.td}><span style={styles.statusBadge}>{item.subscriptionStatus}</span></td>
                      <td style={styles.td}>
                        <button style={styles.deleteButton} onClick={() => handleDelete(item._id)}>
                          <Trash2 size={15} /> Delete
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

const styles = {
  page: { color: '#0f172a', overflowX: 'hidden' },
  header: { display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 24 },
  kicker: { margin: 0, color: '#0e7490', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 12 },
  title: { margin: '8px 0', fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em' },
  subtitle: { margin: 0, color: '#64748b', lineHeight: 1.7, maxWidth: 720 },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ecfeff', color: '#155e75', padding: '12px 18px', borderRadius: 999, fontWeight: 900 },
  message: { background: '#ecfeff', color: '#155e75', padding: 14, borderRadius: 16, marginBottom: 20, fontWeight: 800 },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(320px, 430px) minmax(0, 1fr)', gap: 24, alignItems: 'start' },
  formCard: { background: 'white', padding: 26, borderRadius: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.07)' },
  tableCard: { background: 'white', padding: 26, borderRadius: 28, boxShadow: '0 10px 30px rgba(15,23,42,0.07)', overflow: 'hidden' },
  cardTitle: { margin: 0, fontSize: 24, fontWeight: 900 },
  cardSub: { margin: '8px 0 20px', color: '#64748b', lineHeight: 1.6 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 },
  label: { display: 'grid', gap: 7, color: '#334155', fontWeight: 800, fontSize: 13 },
  labelFull: { display: 'grid', gap: 7, color: '#334155', fontWeight: 800, fontSize: 13, marginTop: 14 },
  input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '13px 14px', fontSize: 14, boxSizing: 'border-box', outlineColor: '#0e7490', background: '#f8fafc', color: '#0f172a' },
  textarea: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '13px 14px', minHeight: 100, boxSizing: 'border-box', outlineColor: '#0e7490', background: '#f8fafc', color: '#0f172a' },
  pricePreview: { marginTop: 16, background: '#0f172a', color: 'white', borderRadius: 20, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  primaryButton: { width: '100%', border: 0, background: '#0e7490', color: 'white', padding: 15, borderRadius: 16, fontWeight: 900, cursor: 'pointer', marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' },
  tableWrap: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', minWidth: 850, borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 14, background: '#f8fafc', color: '#475569', fontSize: 14 },
  td: { padding: 14, borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle' },
  paid: { background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 12, display: 'inline-block' },
  pending: { background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 12, display: 'inline-block' },
  overdue: { background: '#fee2e2', color: '#991b1b', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 12, display: 'inline-block' },
  statusBadge: { background: '#dbeafe', color: '#1d4ed8', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 12, display: 'inline-block' },
  deleteButton: { border: 0, background: '#fee2e2', color: '#991b1b', padding: '9px 12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
  empty: { textAlign: 'center', padding: 30, color: '#64748b' }
};

export default Billing;