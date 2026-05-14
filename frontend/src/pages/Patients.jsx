function Patients() {
  return (
    <div>
      <h1>Patients</h1>
      <p>Manage patient records and personal information.</p>

      <div style={styles.card}>
        <h2>Add Patient</h2>
        <input style={styles.input} placeholder="First Name" />
        <input style={styles.input} placeholder="Last Name" />
        <input style={styles.input} placeholder="Phone" />
        <button style={styles.button}>Save Patient</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: 24, borderRadius: 24 },
  input: { padding: 12, margin: 8, borderRadius: 10, border: '1px solid #cbd5e1' },
  button: { padding: 12, borderRadius: 10, background: '#0891b2', color: 'white', border: 0 }
};

export default Patients;