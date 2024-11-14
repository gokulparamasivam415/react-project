import React, { useState } from 'react';
import Homepage from './pages/homepage';
import Login from './login';
import Signup from './signup';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Start with the Login page

  // Function to change pages
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && <Homepage onNavigate={navigateTo} />}
      {currentPage === 'login' && <Login onLogin={() => navigateTo('home')} />}
      {currentPage === 'signup' && <Signup onSignup={() => navigateTo('home')} />}
    </div>
  );
}

export default App;