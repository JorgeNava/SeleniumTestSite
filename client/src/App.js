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
import Products from './components/products/products';
import Checkout from './components/checkout/checkout';
import Purchases from './components/purchases/purchases';

import './App.scss';
import './normalize.css';
import './styles.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/register' element={< Register />}></Route>
            <Route path='products/:internalId' element={< Products />}></Route>
            <Route exact path='/checkout' element={< Checkout />}></Route>
            <Route exact path='/purchases' element={< Purchases />}></Route>
          </Routes>
        <Footer />
        </Router>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
