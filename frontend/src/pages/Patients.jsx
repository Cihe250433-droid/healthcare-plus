import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPatients, createPatient, deletePatient } from '../services/api.js';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    medicalHistory: ''
  });

  const loadPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data.data || []);
    } catch {
      setMessage('Backend not connected. Showing page layout only.');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPatient(form);
      setMessage('Patient added successfully.');
      setForm({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'Male',
        phone: '',
        email: '',
        address: '',
        medicalHistory: ''
      });
      loadPatients();
    } catch {
      setMessage('Failed to add patient. Check backend and required fields.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setMessage('Patient deleted successfully.');
      loadPatients();
    } catch {
      setMessage('Failed to delete patient.');
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Patient Centre</p>
          <h1 style={styles.title}>Patient Management</h1>
          <p style={styles.subtitle}>
            Register patients, manage profiles and monitor care records.
          </p>
        </div>

        <div style={styles.badge}>
          👥 {patients.length} Patients
        </div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form
          style={styles.formCard}
          onSubmit={handleSubmit}
          whileHover={{ y: -4 }}
        >
          <h2 style={styles.cardTitle}>Add New Patient</h2>
          <p style={styles.cardSub}>Enter patient details below.</p>

          <div style={styles.formGrid}>
            <input
              style={styles.input}
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />

            <select
              style={styles.input}
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              style={styles.input}
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <input
            style={styles.inputFull}
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <textarea
            style={styles.textarea}
            name="medicalHistory"
            placeholder="Medical History"
            value={form.medicalHistory}
            onChange={handleChange}
          />

          <motion.button
            style={styles.primaryButton}
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add Patient
          </motion.button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.cardTitle}>Patient Records</h2>
              <p style={styles.cardSub}>Search and manage saved patients.</p>
            </div>

            <input
              style={styles.search}
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search patients"
            />
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td style={styles.empty} colSpan="5">
                      No patients found yet. Add a patient using the form.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient._id}>
                      <td style={styles.td}>
                        <strong>
                          {patient.firstName} {patient.lastName}
                        </strong>
                        <br />
                        <span style={styles.muted}>{patient.email || 'No email'}</span>
                      </td>
                      <td style={styles.td}>{patient.phone}</td>
                      <td style={styles.td}>{patient.gender}</td>
                      <td style={styles.td}>
                        <span style={styles.status}>Active</span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          type="button"
                          onClick={() => handleDelete(patient._id)}
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

const styles = {
  page: {
    color: '#0f172a'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  kicker: {
    margin: 0,
    color: '#0891b2',
    fontWeight: 900
  },
  title: {
    margin: '6px 0',
    fontSize: 36,
    fontWeight: 900
  },
  subtitle: {
    margin: 0,
    color: '#64748b'
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
    gridTemplateColumns: '0.9fr 1.4fr',
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
  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900
  },
  cardSub: {
    margin: '8px 0 20px',
    color: '#64748b'
  },
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
    marginTop: 14,
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
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center'
  },
  search: {
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    minWidth: 240,
    outlineColor: '#0891b2'
  },
  tableWrap: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
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
  muted: {
    color: '#64748b',
    fontSize: 13
  },
  status: {
    background: '#dcfce7',
    color: '#166534',
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

export default Patients;