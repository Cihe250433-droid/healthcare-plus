function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Manage system preferences and admin profile.</p>

      <div style={styles.card}>
        <h2>System Preferences</h2>
        <label>
          <input type="checkbox" defaultChecked /> Enable appointment reminders
        </label>
        <br />
        <label>
          <input type="checkbox" defaultChecked /> Enable billing alerts
        </label>
      </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: 24, borderRadius: 24 }
};

export default Settings;