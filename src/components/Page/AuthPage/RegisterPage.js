import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
    Logintitle,
    Title,
    SmallFont,
    LoginImage,
    ErrorFont,
    RightContainer,
} from './LoginPage';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
const Container = styled.div`
    display: flex;
    height: 80vh;
    padding: 4%;
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
            background: '#34558b',
        },
    },
});
function LoginPage(props) {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        {
            console.log(props.auth.user);
        }
    }, []);

    const onLoginHandler = (e) => {
        e.preventDefault();
        if (values.password !== values.checkPassword) {
            alert('Password and CheckPassword are different');
        }
        api.post('v1/users/sign-up/', values).then((res) => {
            if (!res.ok) {
                alert('회원가입에 실패하였습니다.');
                return;
            }
            alert('회원가입되었습니다.');
            props.history.replace('/');
        });
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
            checkPassword: '',
            phoneNumber: '',
            nickname: '',
        },
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email('존재하지 않는 형식입니다.')
                .required('필수 항목입니다.'),
            password: yup
                .string()
                .min(4, '비밀번호는 최소 4자리 이상입니다.')
                .required('필수 항목입니다.'),
            checkPassword: yup.string().required('필수 항목입니다.'),
            phoneNumber: yup
                .number()
                .max(11, '최대 11자리입니다 ')

                .required('- 없이 숫자만 입력해주세요.'),
            nickname: yup
                .string()
                .min(2, '최소 2자리 이상 입니다 ')
                .max(6, '최대 6자리 이하 입니다')
                .required('필수 항목입니다.'),
        }),
        onSubmit: (values, { setSubmitting, setErrors }) => {
            console.log('onSubmit result', values);
            api.post('v1/users/sign-in/', values).then((res) => {
                if (res.data.code === 'NotLogin') {
                    alert(res.data.msg);
                    return;
                }
                alert('로그인되었습니다.');
                props.history.replace('/');
                // resetForm();
            });
        },
    });
    const {
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        isSubmitting,
        handleSubmit,
        setFieldValue,
        resetForm,
        setErrors,
    } = formik;
    return (
        <Container>
            <LoginImage bg="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />

            <RightContainer>
                <form onSubmit={onLoginHandler}>
                    <Title>WelcomBack</Title>
                    <Logintitle>Sign up to your account</Logintitle>
                    <SmallFont>Email</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                    />
                    {errors.email && <ErrorFont>{errors.email}</ErrorFont>}
                    <SmallFont>password</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="password"
                        value={values.password}
                        onChange={handleChange('password')}
                    />
                    {errors.password && (
                        <ErrorFont>{errors.password}</ErrorFont>
                    )}
                    <SmallFont>password check</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="password"
                        value={values.checkPassword}
                        onChange={handleChange('checkPassword')}
                    />
                    {errors.checkPassword && (
                        <ErrorFont>{errors.checkPassword}</ErrorFont>
                    )}
                    <SmallFont>Phone Number</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="number"
                        value={values.phoneNumber}
                        // placeholder={'01012345678'}
                        onChange={(e) => {
                            if (e.target.value === ('-' || 'e')) {
                                return;
                            }
                            setFieldValue('phoneNumber', e.target.value);
                        }}
                    />

                    {errors.phoneNumber && (
                        <ErrorFont>{errors.phoneNumber}</ErrorFont>
                    )}
                    <SmallFont>NickName</SmallFont>
                    <Input
                        className={classes.textFiled}
                        type="text"
                        value={values.nickname}
                        onChange={handleChange('nickname')}
                    />
                    {errors.nickname && (
                        <ErrorFont>{errors.nickname}</ErrorFont>
                    )}
                    <p
                        style={{
                            textAlign: 'right',
                            maxWidth: 450,
                            marginTop: -5,
                            color: 'blue',
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
            </RightContainer>
        </Container>
    );
}

export default withAuthContext(LoginPage);
