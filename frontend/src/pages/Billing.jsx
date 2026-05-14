function Billing() {
  return (
    <div>
      <h1>Billing</h1>
      <p>Manage subscriptions, invoices and payment status.</p>

      <div style={styles.card}>
        <h2>Subscription Plan</h2>
        <select style={styles.input}>
          <option>Basic Care</option>
          <option>Premium Care</option>
          <option>Family Care</option>
        </select>
        <input style={styles.input} placeholder="Monthly Fee" />
        <button style={styles.button}>Save Subscription</button>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: 24, borderRadius: 24 },
  input: { padding: 12, margin: 8, borderRadius: 10, border: '1px solid #cbd5e1' },
  button: { padding: 12, borderRadius: 10, background: '#0891b2', color: 'white', border: 0 }
};

export default Billing;