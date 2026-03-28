'use client';

import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Execute directly against the Native Next.js internal /api route instead of Express
      const res = await axios.post(`/api/auth/login`, { email, password });
      if (res.data.success) {
        window.location.href = '/'; 
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid Administrator Credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>VYNEDAM</h1>
        <p className={styles.subtitle}>System Administration Portal</p>

        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Master Administrator Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="name@mallareddyuniversity.ac.in"
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••••••"
            />
          </div>
          <button type="submit" disabled={loading || !email || !password} className={styles.button}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
