import React from 'react';
import './App.css';
import Navbar from './Components/Template/Navbar'
import Footer from './Components/Template/Footer'
import Slider from './Components/Template/Slide'
import About from './Components/About/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Slider} />
      <Route exact path="/about" component={About} />
      <Footer />
    </Router>
  );
}

export default App;
