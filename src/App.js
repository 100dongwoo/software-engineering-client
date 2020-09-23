import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './components/Page/AuthPage/RegisterPage';
import LoginPage from './components/Page/AuthPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/Page/MainPage/MainPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: #000000;
     font-family: DM Sans;
  }
`;

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <>
                    <NavBar />
                    <Route exact path="/" component={MainPage} />
                </>
            </Switch>
        </Router>
    );
}

export default App;
