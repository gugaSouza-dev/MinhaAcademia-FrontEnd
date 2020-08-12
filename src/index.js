import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import Login from './pages/login/Login';
import CadastraAcademia from './pages/cadastraAcademia/CadastraAcademia'

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';



const rotas =(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login}/>
                <Route path="/academia/criar" component={CadastraAcademia}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();