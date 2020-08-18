import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import Cabecalho from '../../components/Cabecalho/Cabecalho'
// import logo from '../../logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>dasdasdasdas</h2>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/academia/criar">Criar Academia</Link>
          <br></br>
          <Link to="/login">
            login
          </Link>

      </div>
    );
  }
}

export default App;