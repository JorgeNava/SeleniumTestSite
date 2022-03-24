import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import ReactDOM from "react-dom";


import Login from './components/login/login';
import Register from './components/register/register';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Requests from './components/requests/requests';

import './App.scss';
import './normalize.css';
import './styles.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
          <Routes>
            <Route exact path='/' element={<Login />}></Route>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
            <Route path='request/:internalId' element={< Requests />}></Route>
          </Routes>
        <Footer />
      </Router>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
