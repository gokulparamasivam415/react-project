import React, { useState } from 'react';

function Login({ onLogin }) { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { username, password });
    onLogin(); 
  };

  return (
    <div style={styles.wrapper}>
       <div style={styles.imageSection}></div>
      <div style={styles.loginSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.title}>Toy Store</h1>
          <h2>Login</h2>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
    wrapper: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    },
    imageSection: {
        flex: 1,
        backgroundColor: '#00008B', 
        backgroundSize: 'cover',  /* Ensures the image covers the entire section */
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',  /* Ensures the height matches its parent */
        border: "3px solid black",
    },
    loginSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        padding: '20px',
        borderRadius: '8px',
        height: '100%',  /* Ensures the height matches its parent */
    },
    title: {
        color: '#333',
        fontSize: '36px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '300px',
        padding: '50px', 
        border: '2px solid #646060',
        borderRadius: '8px',
        backgroundColor: '#fff', 
        alignItems: 'center', 
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
        width: '100%',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Login;