import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import SlickSlider from './components/SlickSlider';
// import RegisterLogin from './components/RegisterLogin';
import Register from './components/Register';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="app-body">
            <div className="container">
              <Route exact path="/" component={SlickSlider} />
              <Route path="/register" component={Register} />
            </div>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
