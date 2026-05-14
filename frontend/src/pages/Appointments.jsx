function Appointments() {
  return (
    <div>
      <h1>Appointments</h1>
      <p>Schedule and manage patient appointments.</p>

      <div style={styles.card}>
        <h2>New Appointment</h2>
        <input style={styles.input} placeholder="Patient ID" />
        <input style={styles.input} placeholder="Doctor Name" />
        <input style={styles.input} type="date" />
        <button style={styles.button}>Book Appointment</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: 24, borderRadius: 24 },
  input: { padding: 12, margin: 8, borderRadius: 10, border: '1px solid #cbd5e1' },
  button: { padding: 12, borderRadius: 10, background: '#0891b2', color: 'white', border: 0 }
};

export default Appointments;