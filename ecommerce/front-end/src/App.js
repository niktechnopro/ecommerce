import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from "./container/NavBar";
import Login from "./container/Login";
import SlickSlider from './components/SlickSlider';
// import RegisterLogin from './components/RegisterLogin';
import Register from './container/Register';
import Home from './components/Home';
import ProductLines from './container/ProductLines';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="app-body">
            <Route exact path="/" component={SlickSlider} />
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/shop/:productLine" component={ProductLines} />
              <Route exact path="/cart" component={Cart} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
