import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './components/Page/AuthPage/RegisterPage';
import LoginPage from './components/Page/AuthPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/Page/MainPage/MainPage';
function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
            </Switch>
        </Router>
    );
}

export default App;
