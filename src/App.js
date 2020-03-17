import React from 'react';
import './App.css';
import Navbar from './Components/Template/Navbar'
import Footer from './Components/Template/Footer'
import Slider from './Components/Template/Slide'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Slider/>
      <Footer />
      </div>
  );
}

export default App;
