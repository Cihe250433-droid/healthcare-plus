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
      setMessage('Backend not connected. Page layout is still available.');
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
    `${patient.firstName} ${patient.lastName} ${patient.phone} ${patient.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header style={styles.hero}>
        <div>
          <p style={styles.kicker}>Healthcare Plus</p>
          <h1 style={styles.title}>Patient Management</h1>
          <p style={styles.subtitle}>
            Register, search and manage patient records from one clean dashboard.
          </p>
        </div>

        <div style={styles.statsCard}>
          <span style={styles.statsIcon}>👥</span>
          <div>
            <strong style={styles.statsNumber}>{patients.length}</strong>
            <p style={styles.statsLabel}>Total Patients</p>
          </div>
        </div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form
          style={styles.formCard}
          onSubmit={handleSubmit}
          whileHover={{ y: -3 }}
        >
          <div style={styles.sectionHeader}>
            <h2 style={styles.cardTitle}>Add New Patient</h2>
            <p style={styles.cardSub}>Fill in the details to create a patient profile.</p>
          </div>

          <div style={styles.formGrid}>
            <input style={styles.input} name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
            <input style={styles.input} name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
            <input style={styles.input} name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />

            <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input style={styles.input} name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
            <input style={styles.input} name="email" placeholder="Email address" value={form.email} onChange={handleChange} />
          </div>

          <input style={styles.inputFull} name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

          <textarea
            style={styles.textarea}
            name="medicalHistory"
            placeholder="Medical history / notes"
            value={form.medicalHistory}
            onChange={handleChange}
          />

          <motion.button
            style={styles.primaryButton}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            + Add Patient
          </motion.button>
        </motion.form>

        <motion.section style={styles.recordsCard} whileHover={{ y: -3 }}>
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.cardTitle}>Patient Records</h2>
              <p style={styles.cardSub}>Search and manage saved patients.</p>
            </div>

            <input
              style={styles.search}
              placeholder="Search by name, phone or email..."
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
                      No patients found. Add a patient using the form.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient._id} style={styles.row}>
                      <td style={styles.td}>
                        <div style={styles.patientCell}>
                          <div style={styles.avatar}>
                            {patient.firstName?.charAt(0)}
                            {patient.lastName?.charAt(0)}
                          </div>
                          <div>
                            <strong>{patient.firstName} {patient.lastName}</strong>
                            <br />
                            <span style={styles.muted}>{patient.email || 'No email added'}</span>
                          </div>
                        </div>
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
    minHeight: '100vh',
    padding: '28px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 45%, #f0fdfa 100%)',
    color: '#0f172a',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    padding: 28,
    borderRadius: 30,
    marginBottom: 24,
    background: 'linear-gradient(135deg, #0f172a, #155e75)',
    color: 'white',
    boxShadow: '0 20px 45px rgba(15, 23, 42, 0.18)',
    flexWrap: 'wrap'
  },
  kicker: {
    margin: 0,
    color: '#67e8f9',
    fontWeight: 900,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 13
  },
  title: {
    margin: '8px 0',
    fontSize: 'clamp(30px, 4vw, 46px)',
    fontWeight: 900
  },
  subtitle: {
    margin: 0,
    color: '#dbeafe',
    fontSize: 16,
    maxWidth: 650,
    lineHeight: 1.6
  },
  statsCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'rgba(255,255,255,0.14)',
    padding: '18px 22px',
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.25)'
  },
  statsIcon: {
    fontSize: 30
  },
  statsNumber: {
    display: 'block',
    fontSize: 28
  },
  statsLabel: {
    margin: 0,
    color: '#cffafe',
    fontWeight: 700
  },
  message: {
    background: '#ecfeff',
    color: '#155e75',
    padding: 15,
    borderRadius: 18,
    marginBottom: 22,
    fontWeight: 800,
    border: '1px solid #a5f3fc'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 430px) minmax(0, 1fr)',
    gap: 24,
    alignItems: 'start'
  },
  formCard: {
    background: 'rgba(255,255,255,0.95)',
    padding: 26,
    borderRadius: 30,
    boxShadow: '0 18px 40px rgba(15,23,42,0.10)',
    border: '1px solid rgba(226,232,240,0.9)'
  },
  recordsCard: {
    background: 'rgba(255,255,255,0.95)',
    padding: 26,
    borderRadius: 30,
    boxShadow: '0 18px 40px rgba(15,23,42,0.10)',
    border: '1px solid rgba(226,232,240,0.9)',
    minWidth: 0,
    overflow: 'hidden'
  },
  sectionHeader: {
    marginBottom: 20
  },
  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900,
    color: '#0f172a'
  },
  cardSub: {
    margin: '8px 0 0',
    color: '#64748b',
    lineHeight: 1.5
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 14
  },
  input: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 16,
    padding: '14px 15px',
    fontSize: 15,
    outlineColor: '#06b6d4',
    boxSizing: 'border-box',
    background: '#ffffff',
    color: '#0f172a'
  },
  inputFull: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 16,
    padding: '14px 15px',
    fontSize: 15,
    marginTop: 14,
    boxSizing: 'border-box',
    outlineColor: '#06b6d4',
    background: '#ffffff',
    color: '#0f172a'
  },
  textarea: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 16,
    padding: '14px 15px',
    fontSize: 15,
    marginTop: 14,
    minHeight: 110,
    boxSizing: 'border-box',
    outlineColor: '#06b6d4',
    background: '#ffffff',
    color: '#0f172a',
    resize: 'vertical'
  },
  primaryButton: {
    width: '100%',
    border: 0,
    background: 'linear-gradient(135deg, #0891b2, #0f172a)',
    color: 'white',
    padding: 16,
    borderRadius: 18,
    fontWeight: 900,
    cursor: 'pointer',
    marginTop: 16,
    fontSize: 15,
    boxShadow: '0 12px 25px rgba(8,145,178,0.25)'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 18,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 18
  },
  search: {
    border: '1px solid #cbd5e1',
    borderRadius: 16,
    padding: '14px 15px',
    width: 300,
    maxWidth: '100%',
    outlineColor: '#06b6d4',
    background: '#ffffff',
    color: '#0f172a',
    boxSizing: 'border-box',
    fontSize: 15
  },
  tableWrap: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: 20,
    border: '1px solid #e2e8f0'
  },
  table: {
    width: '100%',
    minWidth: 760,
    borderCollapse: 'collapse',
    background: 'white'
  },
  th: {
    textAlign: 'left',
    padding: 16,
    background: '#f1f5f9',
    color: '#334155',
    fontSize: 14,
    fontWeight: 900,
    whiteSpace: 'nowrap'
  },
  row: {
    transition: '0.2s ease'
  },
  td: {
    padding: 16,
    borderBottom: '1px solid #e2e8f0',
    color: '#0f172a',
    fontSize: 14,
    verticalAlign: 'middle'
  },
  patientCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #06b6d4, #155e75)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    flexShrink: 0
  },
  muted: {
    color: '#64748b',
    fontSize: 13
  },
  status: {
    background: '#dcfce7',
    color: '#166534',
    padding: '7px 13px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    display: 'inline-block'
  },
  deleteButton: {
    border: 0,
    background: '#fee2e2',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: 13,
    fontWeight: 900,
    cursor: 'pointer'
  },
  empty: {
    textAlign: 'center',
    padding: 34,
    color: '#64748b',
    fontWeight: 700
  }
};

export default Patients;