import React, { useState } from 'react';
import styles from './AdminLogin.module.css';

const AdminLogin = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = 'menigafni';
    if (password === correctPassword) {
      onLogin(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className={styles.adminAccess}>
      {!showLogin ? (
        <button 
          className={styles.adminButton}
          onClick={() => setShowLogin(true)}
          title="Admin Access"
        >
          מנהל
        </button>
      ) : (
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
            autoFocus
          />
          <div className={styles.formButtons}>
            <button type="submit" className={styles.submitButton}>
              כניסה
            </button>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => {
                setShowLogin(false);
                setPassword('');
              }}
            >
              ביטול
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;