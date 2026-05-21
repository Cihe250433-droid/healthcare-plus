import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Pencil, Trash2, Save, X } from 'lucide-react';
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
} from '../services/api.js';

function Patients() {
  const emptyForm = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    medicalHistory: ''
  };

  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const loadPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data.data || []);
    } catch {
      setMessage('Could not load patients. Please check the backend server.');
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePatient(editingId, form);
        setMessage('Patient details updated.');
      } else {
        await createPatient(form);
        setMessage('Patient added.');
      }

      resetForm();
      loadPatients();
    } catch {
      setMessage('Could not save patient details.');
    }
  };

  const handleEdit = (patient) => {
    setEditingId(patient._id);
    setForm({
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.slice(0, 10) : '',
      gender: patient.gender || 'Male',
      phone: patient.phone || '',
      email: patient.email || '',
      address: patient.address || '',
      medicalHistory: patient.medicalHistory || ''
    });
    setMessage('Editing patient details.');
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setMessage('Patient removed.');
      loadPatients();

      if (editingId === id) resetForm();
    } catch {
      setMessage('Could not delete patient.');
    }
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.phone} ${patient.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <motion.div style={styles.page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Patients</p>
          <h1 style={styles.title}>Patient Records</h1>
          <p style={styles.subtitle}>
            Add new patients and update existing details when information needs to be corrected.
          </p>
        </div>

        <div style={styles.badge}>
          <Users size={18} />
          {patients.length} records
        </div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form style={styles.formCard} onSubmit={handleSubmit} whileHover={{ y: -4 }}>
          <div style={styles.formHeader}>
            <div>
              <h2 style={styles.cardTitle}>{editingId ? 'Edit patient' : 'Add patient'}</h2>
              <p style={styles.cardSub}>
                {editingId ? 'Update the details and save the changes.' : 'Enter the patient details below.'}
              </p>
            </div>

            {editingId && (
              <button type="button" style={styles.cancelButton} onClick={resetForm}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <div style={styles.formGrid}>
            <label style={styles.label}>
              First name
              <input style={styles.input} name="firstName" value={form.firstName} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Last name
              <input style={styles.input} name="lastName" value={form.lastName} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Date of birth
              <input style={styles.input} type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Gender
              <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>

            <label style={styles.label}>
              Phone
              <input style={styles.input} name="phone" value={form.phone} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Email
              <input style={styles.input} name="email" value={form.email} onChange={handleChange} />
            </label>
          </div>

          <label style={styles.labelFull}>
            Address
            <input style={styles.input} name="address" value={form.address} onChange={handleChange} required />
          </label>

          <label style={styles.labelFull}>
            Notes / medical history
            <textarea style={styles.textarea} name="medicalHistory" value={form.medicalHistory} onChange={handleChange} />
          </label>

          <button type="submit" style={editingId ? styles.updateButton : styles.primaryButton}>
            <Save size={17} />
            {editingId ? 'Save changes' : 'Add patient'}
          </button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.cardTitle}>Saved patients</h2>
              <p style={styles.cardSub}>Search, edit or remove patient records.</p>
            </div>

            <div style={styles.searchBox}>
              <Search size={18} />
              <input
                style={styles.searchInput}
                placeholder="Search patients"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td style={styles.empty} colSpan="4">No patient records found.</td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient._id}>
                      <td style={styles.td}>
                        <strong>{patient.firstName} {patient.lastName}</strong>
                        <br />
                        <span style={styles.muted}>{patient.email || 'No email added'}</span>
                      </td>
                      <td style={styles.td}>{patient.phone}</td>
                      <td style={styles.td}>{patient.gender}</td>
                      <td style={styles.td}>
                        <div style={styles.actionGroup}>
                          <button style={styles.editButton} onClick={() => handleEdit(patient)}>
                            <Pencil size={15} /> Edit
                          </button>
                          <button style={styles.deleteButton} onClick={() => handleDelete(patient._id)}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
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
  formHeader: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' },
  cardTitle: { margin: 0, fontSize: 24, fontWeight: 900 },
  cardSub: { margin: '8px 0 20px', color: '#64748b', lineHeight: 1.6 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 },
  label: { display: 'grid', gap: 7, color: '#334155', fontWeight: 800, fontSize: 13 },
  labelFull: { display: 'grid', gap: 7, color: '#334155', fontWeight: 800, fontSize: 13, marginTop: 14 },
  input: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '13px 14px', fontSize: 14, boxSizing: 'border-box', outlineColor: '#0e7490', background: '#f8fafc', color: '#0f172a' },
  textarea: { width: '100%', border: '1px solid #cbd5e1', borderRadius: 14, padding: '13px 14px', minHeight: 100, boxSizing: 'border-box', outlineColor: '#0e7490', background: '#f8fafc', color: '#0f172a' },
  primaryButton: { width: '100%', border: 0, background: '#0e7490', color: 'white', padding: 15, borderRadius: 16, fontWeight: 900, cursor: 'pointer', marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' },
  updateButton: { width: '100%', border: 0, background: '#0f172a', color: 'white', padding: 15, borderRadius: 16, fontWeight: 900, cursor: 'pointer', marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' },
  cancelButton: { border: 0, background: '#e2e8f0', color: '#0f172a', padding: '10px 14px', borderRadius: 14, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
  tableHeader: { display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' },
  searchBox: { display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 14, padding: '0 12px', minWidth: 240 },
  searchInput: { border: 0, background: 'transparent', outline: 'none', padding: '13px 0', width: '100%' },
  tableWrap: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', minWidth: 700, borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 14, background: '#f8fafc', color: '#475569', fontSize: 14 },
  td: { padding: 14, borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle' },
  muted: { color: '#64748b', fontSize: 13 },
  actionGroup: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  editButton: { border: 0, background: '#ecfeff', color: '#155e75', padding: '9px 12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
  deleteButton: { border: 0, background: '#fee2e2', color: '#991b1b', padding: '9px 12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
  empty: { textAlign: 'center', padding: 30, color: '#64748b' }
};

export default Patients;