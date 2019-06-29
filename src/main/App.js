import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Home from '../pages/Home'
import Characters from '../pages/Characters';
import Details from '../pages/Details';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/characters' exact component={Characters} />
        <Route path='/details' exact component={Details} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
}

export default App;
