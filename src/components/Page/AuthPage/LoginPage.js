import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const Title = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #2d3748;
    margin-bottom: -3%;
`;
const Logintitle = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
`;
const SmallFont = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    opacity: 0.8;
`;
const LoginImage = styled.div`
    width: 100%;
    //이 주석은 해제 하시면 화면크기에 맞춰서 이미지가 변경되긴합니다
    // background-size: cover;
    // background-position: center center;

    height: 80vh;
    background-image: url(${(props) => props.bg});
`;
const useStyles = makeStyles({
    textFiled: {
        border: ' 1px solid #E8E8E8',
        boxSizing: 'border-box',
        borderRadius: '5px',
        height: '50px',
        width: '100%',
        underline: false,
        maxWidth: 450,
        marginBottom: 10,
    },
    loginBtn: {
        background: '#04C45C',
        borderRadius: '5px',
        width: '100%',
        maxWidth: 400,
        height: 50,
        marginTop: 25,
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#FFFFFF',
        '&:hover': {
            background: '#04C45C',
        },
    },
});
function LoginPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLoginHandler = (e) => {
        e.preventDefault();
        if (email === '' || password === '')
            alert('이메일 또는 비밀번호를 입력하세요');
    };
    return (
        <div
            style={{
                display: 'flex',
                height: '80vh',
                padding: '4% 4% 4% 4%',
            }}
        >
            <div style={{ width: '50%' }}>
                <LoginImage bg="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
            </div>
            <div
                style={{
                    paddingLeft: '10%',
                    textAlign: 'left',
                    width: '40%',
                    margin: 'auto',
                }}
            >
                <form onSubmit={onLoginHandler}>
                    <Title>WelcomBack</Title>
                    <Logintitle>Login to your account</Logintitle>
                    <SmallFont>Email</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <SmallFont>pass word</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <p
                        style={{
                            textAlign: 'right',
                            maxWidth: 450,
                            marginTop: -5,
                            color: 'red',
                            cursor: 'pointer',
                            fontSize: 13,
                        }}
                        onClick={() => {
                            history.push('/register');
                        }}
                    >
                        회원가입 하러가기
                    </p>
                    <Button
                        onClick={onLoginHandler}
                        className={classes.loginBtn}
                    >
                        Login now
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
