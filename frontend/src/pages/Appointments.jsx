import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Trash2, Save } from 'lucide-react';
import {
  getAppointments,
  createAppointment,
  deleteAppointment,
  getPatients
} from '../services/api.js';

function Appointments() {
  const doctors = ['Dr Sarah Williams', 'Dr James Carter', 'Dr Emily White', 'Dr Michael Brown'];
  const departments = ['General Medicine', 'Emergency', 'Cardiology', 'Pathology', 'Radiology', 'Pediatrics'];
  const reasons = ['Emergency', 'General Visit', 'Follow-up', 'Routine Checkup', 'Consultation', 'Prescription Renewal'];

  const emptyForm = {
    patient: '',
    doctorName: doctors[0],
    department: departments[0],
    appointmentDate: '',
    appointmentTime: '',
    reason: reasons[1],
    status: 'Scheduled',
    notes: ''
  };

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [appointmentsRes, patientsRes] = await Promise.all([getAppointments(), getPatients()]);
      setAppointments(appointmentsRes.data.data || []);
      setPatients(patientsRes.data.data || []);
    } catch {
      setMessage('Could not load appointments. Please check the backend server.');
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
      setMessage('Appointment added.');
      setForm(emptyForm);
      loadData();
    } catch {
      setMessage('Could not save appointment.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setMessage('Appointment removed.');
      loadData();
    } catch {
      setMessage('Could not delete appointment.');
    }
  };

  const getPatientName = (appointment) => {
    if (!appointment.patient) return 'Unknown patient';
    if (typeof appointment.patient === 'object') {
      return `${appointment.patient.firstName || ''} ${appointment.patient.lastName || ''}`.trim();
    }
    return 'Patient record';
  };

  return (
    <motion.div style={styles.page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <header style={styles.header}>
        <div>
          <p style={styles.kicker}>Appointments</p>
          <h1 style={styles.title}>Schedule Visits</h1>
          <p style={styles.subtitle}>
            Choose the patient, doctor, department and reason for the appointment.
          </p>
        </div>

        <div style={styles.badge}>
          <CalendarDays size={18} />
          {appointments.length} bookings
        </div>
      </header>

      {message && <div style={styles.message}>{message}</div>}

      <section style={styles.grid}>
        <motion.form style={styles.formCard} onSubmit={handleSubmit} whileHover={{ y: -4 }}>
          <h2 style={styles.cardTitle}>New appointment</h2>
          <p style={styles.cardSub}>Add a visit to the clinic schedule.</p>

          <div style={styles.formGrid}>
            <label style={styles.label}>
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

            <label style={styles.label}>
              Doctor
              <select style={styles.input} name="doctorName" value={form.doctorName} onChange={handleChange}>
                {doctors.map((doctor) => <option key={doctor}>{doctor}</option>)}
              </select>
            </label>

            <label style={styles.label}>
              Department
              <select style={styles.input} name="department" value={form.department} onChange={handleChange}>
                {departments.map((department) => <option key={department}>{department}</option>)}
              </select>
            </label>

            <label style={styles.label}>
              Reason
              <select style={styles.input} name="reason" value={form.reason} onChange={handleChange}>
                {reasons.map((reason) => <option key={reason}>{reason}</option>)}
              </select>
            </label>

            <label style={styles.label}>
              Date
              <input style={styles.input} type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Time
              <input style={styles.input} type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required />
            </label>

            <label style={styles.label}>
              Status
              <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
                <option>Scheduled</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </label>
          </div>

          <label style={styles.labelFull}>
            Notes
            <textarea style={styles.textarea} name="notes" value={form.notes} onChange={handleChange} />
          </label>

          <button type="submit" style={styles.primaryButton}>
            <Save size={17} /> Add appointment
          </button>
        </motion.form>

        <motion.section style={styles.tableCard} whileHover={{ y: -4 }}>
          <h2 style={styles.cardTitle}>Upcoming and saved visits</h2>
          <p style={styles.cardSub}>Review the appointments currently recorded.</p>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Doctor</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr><td style={styles.empty} colSpan="6">No appointments added yet.</td></tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td style={styles.td}>{getPatientName(appointment)}</td>
                      <td style={styles.td}>{appointment.doctorName}</td>
                      <td style={styles.td}>{appointment.department}</td>
                      <td style={styles.td}>{appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : '-'}</td>
                      <td style={styles.td}><span style={styles.statusBadge}>{appointment.status || 'Scheduled'}</span></td>
                      <td style={styles.td}>
                        <button style={styles.deleteButton} onClick={() => handleDelete(appointment._id)}>
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
  primaryButton: { width: '100%', border: 0, background: '#0e7490', color: 'white', padding: 15, borderRadius: 16, fontWeight: 900, cursor: 'pointer', marginTop: 14, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' },
  tableWrap: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', minWidth: 850, borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 14, background: '#f8fafc', color: '#475569', fontSize: 14 },
  td: { padding: 14, borderBottom: '1px solid #e2e8f0', verticalAlign: 'middle' },
  statusBadge: { background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: 999, fontWeight: 900, fontSize: 12, display: 'inline-block' },
  deleteButton: { border: 0, background: '#fee2e2', color: '#991b1b', padding: '9px 12px', borderRadius: 12, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 },
  empty: { textAlign: 'center', padding: 30, color: '#64748b' }
};

export default Appointments;