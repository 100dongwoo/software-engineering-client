import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Logintitle, Title, SmallFont, LoginImage } from './LoginPage';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';
const Container = styled.div`
    display: flex;
    height: 80vh;
    padding: 4% 4% 4% 4%;
    @media (max-width: 800px) {
        padding: 0 0 0 0;
    }
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
        '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
        },
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
    const [checkPassword, setCheckPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(()=>{

    },[]);

    const onLoginHandler = (e) => {
        e.preventDefault();
        if (
            email === '' ||
            password === '' ||
            checkPassword === '' ||
            nickname === '' ||
            phoneNumber === ''
        )
            alert('정보를 입력해주세요.');
        else if (password !== checkPassword) {
            alert('Password and CheckPassword are different');
        }
        api.post('v1/users/sign-up/', {
            email,
            password,
            phoneNumber,
            nickname,
        }).then(res=>{
            if(!res.ok){alert('회원가입에 실패하였습니다.'); return}
            props.history.replace('/');
        })
    };
    return (
        <Container>
            {console.log(props.auth)}
            {/*props.auth._setUser(null);*/}
            {/*props.auth.user*/}
            <div
                style={{
                    paddingLeft: '15%',
                    textAlign: 'left',
                    width: '40%',
                    margin: 'auto',
                }}
            >
                <form onSubmit={onLoginHandler}>
                    <Title>WelcomBack</Title>
                    <Logintitle>Sign up to your account</Logintitle>
                    <SmallFont>Email</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <SmallFont>password</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <SmallFont>password check</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="password"
                        value={checkPassword}
                        onChange={(e) =>
                            setCheckPassword(e.currentTarget.value)
                        }
                    />
                    <SmallFont>Phone Number</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.currentTarget.value);
                        }}
                    />
                    <SmallFont>NickName</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="text"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.currentTarget.value);
                        }}
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
                            history.push('/login');
                        }}
                    >
                        로그인 하러가기
                    </p>
                    <Button
                        type="submit"
                        onClick={onLoginHandler}
                        className={classes.loginBtn}
                    >
                        Sign Up now
                    </Button>
                </form>
            </div>
            <LoginImage bg="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
        </Container>
    );
}

export default withAuthContext(LoginPage);
