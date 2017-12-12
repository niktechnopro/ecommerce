import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import SlickSlider from './components/SlickSlider';
import RegisterLogin from './components/RegisterLogin';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar /> //navbar always shows up
          <Route exact path="/" component={SlickSlider} />
          <Route path="/login" component={RegisterLogin} />
        </div>
      </Router>
    );
  }
}

export default App;
