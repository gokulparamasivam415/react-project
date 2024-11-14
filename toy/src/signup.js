import React, { useState, createContext, useContext } from 'react';

// Create the context
const SignupContext = createContext();

// Create the SignupProvider and the Signup component in one file
const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // This will be used to manage submission state

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', { firstname, lastname, email, password });
    setSubmitted(true); // Trigger the submission state
    window.location.href = '/home';
  };

  return (
    <SignupContext.Provider
      value={{
        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        submitted, setSubmitted,
        handleSubmit // Pass the handleSubmit function down via context
      }}
    >
      <SignupForm />
    </SignupContext.Provider>
  );
};

// Child component to use the context
const SignupForm = () => {
  const {
    firstname, setFirstname,
    lastname, setLastname,
    email, setEmail,
    password, setPassword,
    submitted,
    handleSubmit // Use handleSubmit from context
  } = useContext(SignupContext);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Toy Store</h1>
        <h2 style={styles.title}>Sign Up</h2>
        {submitted && <p style={styles.successMessage}>Signup successful!</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      </div>
    </div>
  );
};

// Styles (unchanged)
const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Full viewport height to center vertically
    backgroundColor: '#00008B',  // Background color for the entire page
  },
  container: {
    maxWidth: '300px',
    margin: '0 auto',
    padding: '55px',  // Reduced padding for a smaller box
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '2px solid black',
  },
  title: {
    fontSize: '1.5rem',  // Reduced font size for better fit in smaller box
    marginBottom: '10px',  // Reduced margin for a tighter design
    color: '#333',
  },
  successMessage: {
    color: '#28a745',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',  // Reduced margin for tighter spacing
    padding: '10px',  // Adjusted padding to fit smaller box
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',  // Adjusted padding for a smaller button
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Signup;