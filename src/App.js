import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './components/Page/AuthPage/RegisterPage';
import LoginPage from './components/Page/AuthPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import PostPage from './components/Page/PostPage/PostPage';
import Introduce from './components/Page/Introduce/Introduce';
import { createGlobalStyle } from 'styled-components';
import { AuthContextProvider } from './context/AuthContext';
import Mypage from './components/Page/Mypage/Mypage';
import Uploadpage from './components/Page/Uploadpage/Uploadpage';

const GlobalStyle = createGlobalStyle`
  body {
    color: #000000;
     font-family: DM Sans;
  }
`;

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <GlobalStyle />
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                    <>
                        <NavBar />
                        <Route exact path="/post" component={PostPage} />
                        <Route exact path="/introduce" component={Introduce} />
                        <Route exact path="/mypage" component={Mypage} />
                        <Route
                            exact
                            path="/uploadpage"
                            component={Uploadpage}
                        />
                    </>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
