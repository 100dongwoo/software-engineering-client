import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './components/Page/AuthPage/RegisterPage';
import LoginPage from './components/Page/AuthPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import PostPage from './components/Page/PostPage/PostPage';
import Mainpage from './components/Page/Mainpage/Mainpage';
import { createGlobalStyle } from 'styled-components';
import { AuthContextProvider } from './context/AuthContext';
import Mypage from './components/Page/Mypage/Mypage';
import Uploadpage from './components/Page/Uploadpage/Uploadpage';
import Contentpage from './components/Page/Contentpage/Contentpage';
import './styles/index.css';
const GlobalStyle = createGlobalStyle`
  body {
    color: #000000;
     font-family: payboocLight;
     padding : 0 4%;

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
                        <Route exact path="/" component={Mainpage} />
                        <Route exact path="/mypage" component={Mypage} />
                        <Route
                            exact
                            path="/uploadpage"
                            component={Uploadpage}
                        />
                        <Route
                            exact
                            path="/post/:postid"
                            component={Contentpage}
                        />

                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path="/Contentpage"*/}
                        {/*    component={Contentpage}*/}
                        {/*/>*/}
                    </>
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
