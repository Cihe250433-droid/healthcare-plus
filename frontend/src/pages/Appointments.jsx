import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getPatients,
  getAppointments,
  createAppointment,
  deleteAppointment
} from '../services/api.js';

function Appointments() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    patient: '',
    doctorName: '',
    department: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    status: 'Scheduled',
    notes: ''
  });

  const loadData = async () => {
    try {
      const patientsRes = await getPatients();
      const appointmentsRes = await getAppointments();

      setPatients(patientsRes.data.data || []);
      setAppointments(appointmentsRes.data.data || []);
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
      await createAppointment(form);
      setMessage('Appointment created successfully.');

      setForm({
        patient: '',
        doctorName: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        status: 'Scheduled',
        notes: ''
      });

      loadData();
    } catch {
      setMessage('Failed to create appointment. Check all required fields.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setMessage('Appointment deleted successfully.');
      loadData();
    } catch {
      setMessage('Failed to delete appointment.');
    }
  };

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Appointment Centre</p>
          <h1 style={styles.title}>Appointment Management</h1>
          <p style={styles.subtitle}>
            Schedule appointments, assign doctors and track visit status.
          </p>
        </div>

        <div style={styles.badge}>📅 {appointments.length} Appointments</div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form
          style={styles.formCard}
          onSubmit={handleSubmit}
          whileHover={{ y: -4 }}
        >
          <h2 style={styles.cardTitle}>Book Appointment</h2>
          <p style={styles.cardSub}>Select patient and appointment details.</p>

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
            <input
              style={styles.input}
              name="doctorName"
              placeholder="Doctor Name"
              value={form.doctorName}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="appointmentDate"
              type="date"
              value={form.appointmentDate}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="appointmentTime"
              placeholder="Time e.g. 10:30 AM"
              value={form.appointmentTime}
              onChange={handleChange}
              required
            />

            <input
              style={styles.input}
              name="reason"
              placeholder="Reason for visit"
              value={form.reason}
              onChange={handleChange}
              required
            />

            <select
              style={styles.input}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>No Show</option>
            </select>
          </div>

          <textarea
            style={styles.textarea}
            name="notes"
            placeholder="Appointment notes"
            value={form.notes}
            onChange={handleChange}
          />

          <motion.button
            style={styles.primaryButton}
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Create Appointment
          </motion.button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.cardTitle}>Appointment Schedule</h2>
              <p style={styles.cardSub}>View and manage appointment records.</p>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Doctor</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Time</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td style={styles.empty} colSpan="6">
                      No appointments found. Create one using the form.
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td style={styles.td}>
                        <strong>
                          {appointment.patient?.firstName || 'Unknown'}{' '}
                          {appointment.patient?.lastName || 'Patient'}
                        </strong>
                        <br />
                        <span style={styles.muted}>
                          {appointment.reason || 'No reason added'}
                        </span>
                      </td>

                      <td style={styles.td}>{appointment.doctorName}</td>

                      <td style={styles.td}>
                        {appointment.appointmentDate?.slice(0, 10)}
                      </td>

                      <td style={styles.td}>{appointment.appointmentTime}</td>

                      <td style={styles.td}>
                        <span style={getStatusStyle(appointment.status)}>
                          {appointment.status}
                        </span>
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          type="button"
                          onClick={() => handleDelete(appointment._id)}
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

function getStatusStyle(status) {
  if (status === 'Completed') return styles.completed;
  if (status === 'Cancelled') return styles.cancelled;
  if (status === 'No Show') return styles.noShow;
  return styles.scheduled;
}

const styles = {
  page: {
    color: '#0f172a',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 24,
    flexWrap: 'wrap'
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
    fontWeight: 900,
    whiteSpace: 'nowrap'
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
    gridTemplateColumns: 'minmax(320px, 420px) minmax(0, 1fr)',
    gap: 24,
    alignItems: 'start',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box'
  },
  formCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)',
    width: '100%',
    boxSizing: 'border-box'
  },
  tableCard: {
    background: 'white',
    padding: 26,
    borderRadius: 28,
    boxShadow: '0 10px 30px rgba(15,23,42,0.07)',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 6
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
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 14
  },
  input: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    fontSize: 14,
    outlineColor: '#0891b2',
    boxSizing: 'border-box',
    background: '#111827',
    color: 'white'
  },
  inputFull: {
    width: '100%',
    border: '1px solid #cbd5e1',
    borderRadius: 14,
    padding: '13px 14px',
    fontSize: 14,
    marginBottom: 14,
    boxSizing: 'border-box',
    outlineColor: '#0891b2',
    background: '#111827',
    color: 'white'
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
    outlineColor: '#0891b2',
    background: '#111827',
    color: 'white'
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
  tableWrap: {
    width: '100%',
    overflowX: 'auto',
    maxWidth: '100%'
  },
  table: {
    width: '100%',
    minWidth: 760,
    borderCollapse: 'collapse',
    tableLayout: 'fixed'
  },
  th: {
    textAlign: 'left',
    padding: 14,
    background: '#f8fafc',
    color: '#475569',
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
  td: {
    padding: 14,
    borderBottom: '1px solid #e2e8f0',
    wordBreak: 'break-word',
    verticalAlign: 'middle'
  },
  muted: {
    color: '#64748b',
    fontSize: 13
  },
  scheduled: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    display: 'inline-block'
  },
  completed: {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    display: 'inline-block'
  },
  cancelled: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    display: 'inline-block'
  },
  noShow: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 900,
    fontSize: 12,
    display: 'inline-block'
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

export default Appointments;