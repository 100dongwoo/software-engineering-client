import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import { withAuthContext } from '../../context/AuthContext';
import api from '../../api_manager';

const Navbar = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 1.7125rem;
    line-height: 120%;
    letter-spacing: -0.03em;
    padding: 15px 20px;
    float: right;
    border-bottom: solid 1px #e8e8e8;
    &:hover {
        color: #34558b;
        border-bottom: 1px solid #34558b;
    }
    color: #181717;
    @media only screen and (max-width: 1024px) {
        display: none;
    }
`;

const SideBtn = styled.button`
    height: 55px;
    background: none;
    border: none;
    display: none;

    @media only screen and (max-width: 1024px) {
        display: inline-block !important;
        margin-right: -2%;
    }
`;
const SideMenu = styled.p`
    margin-left: 20px;
    text-decoration: none;

    cursor: pointer;
    &:hover {
        color: #34558b;
    }
    @media only screen and (max-width: 1024px) {
        display: inline-block !important;
    }
`;

function NavBar(props) {
    const DrawClose = (a) => {
        setVisible(false);
    };
    const Drawopen = () => {
        setVisible(true);
    };
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const logout = () => {
        api.get('v1/users/sign-out/')
            .then((res) => {
                if (!res.ok) {
                    alert('로그아웃에 실패하였습니다.');
                    return;
                }
                props.auth.addUserInfo({
                    id: '',
                    email: '',
                    phoneNumber: '',
                    nickname: '',
                    image: '',
                });
                alert('로그아웃되었습니다. ');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div style={{ display: 'flex', borderBottom: 'solid 1px #e8e8e8' }}>
            {/* 로고 */}
            <Link to={'/'}>
                <img
                    // src={'../../../public/LOGO193.png'}
                    src={
                        'https://software-service1.s3.ap-northeast-2.amazonaws.com/LOGO193.png'
                    }
                    style={{
                        width: '3.5rem',
                        height: '3.5rem',
                    }}
                    alt="LOGO"
                />
            </Link>
            <div
                style={{
                    width: '100%',
                }}
            >
                {/*메뉴바 컨테이너 */}

                {props.auth.user?.email === '' ? (
                    <>
                        <Navbar to={'/register'}>회원가입</Navbar>
                        <Navbar to={'/login'}>로그인</Navbar>
                    </>
                ) : (
                    <>
                        <Navbar to={'/'} onClick={logout}>
                            로그아웃
                        </Navbar>
                        <Navbar to={`/mypage/${props.auth.user?.id}`}>
                            마이페이지
                        </Navbar>
                    </>
                )}
                <Navbar to={'/Start-Place'}>창업 지원센터</Navbar>
                <Navbar to={'/Notice'}>창업 공지사항</Navbar>
                <Navbar to={'/post'}>게시판</Navbar>
                <Navbar to={'/'}>소개</Navbar>
            </div>
            <SideBtn>
                <MenuOpenSharpIcon
                    style={{ fontSize: '1.875rem' }}
                    onClick={Drawopen}
                />
            </SideBtn>
            <div>
                <Drawer anchor="right" open={visible} onClose={DrawClose}>
                    <p
                        style={{
                            padding: '10px 140px 10px 20px ',
                            borderBottom: 'solid 1px #e8e8e8',
                        }}
                    >
                        M S S I
                    </p>
                    <SideMenu
                        onClick={() => {
                            setVisible(false);
                            history.push('/');
                        }}
                    >
                        소개
                    </SideMenu>
                    <SideMenu
                        onClick={() => {
                            setVisible(false);
                            history.push('/post');
                        }}
                    >
                        게시판
                    </SideMenu>

                    <SideMenu
                        onClick={() => {
                            setVisible(false);
                            history.push('/Start-Place');
                        }}
                    >
                        창업 지원센터
                    </SideMenu>
                    <SideMenu
                        onClick={() => {
                            setVisible(false);
                            history.push('/Notice');
                        }}
                    >
                        사업공지사항
                    </SideMenu>
                    {props.auth.user.email === '' ? (
                        <>
                            <SideMenu
                                onClick={() => {
                                    setVisible(false);
                                    history.push('/login');
                                }}
                            >
                                로그인
                            </SideMenu>
                            <SideMenu
                                onClick={() => {
                                    setVisible(false);
                                    history.push('/register');
                                }}
                            >
                                회원가입
                            </SideMenu>
                        </>
                    ) : (
                        <>
                            <SideMenu
                                onClick={() => {
                                    setVisible(false);
                                    history.push(
                                        `/mypage/${props.auth.user.id}`
                                    );
                                }}
                            >
                                마이페이지
                            </SideMenu>
                            <SideMenu onClick={logout}>로그아웃</SideMenu>
                        </>
                    )}
                </Drawer>
            </div>
        </div>
    );
}

export default withAuthContext(NavBar);
