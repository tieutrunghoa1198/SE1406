import React from 'react';
import './App.css';
import Navbar from './Components/Template/Navbar'
import Footer from './Components/Template/Footer'
import Record from './Components/Record/Record'
function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid text-center">
        <Record />
      </div>
      <Footer />
    </>
  );
}

export default App;
