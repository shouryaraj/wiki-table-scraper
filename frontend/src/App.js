import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Input, InputGroup, Icon} from 'rsuite';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import './App.css';
import Search from './search.js';
import TableDisplay from './TableDisplay.js';

// import default style
import 'rsuite/dist/styles/rsuite-default.css';
import { render } from 'react-dom';
class App extends React.Component {

  render() {
    return (
      <Router>
           
           <Route path="/" exact component={Search}></Route>
           {/* <Route path='/table' component={TableDisplay} /> */}
      </Router>
      
    );
  }
}

export default App;
