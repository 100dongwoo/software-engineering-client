import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';

const Navbar = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
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
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
const SideBtn = styled.button`
    height: 55px;
    background: none;
    border: none;
    display: none;

    @media only screen and (max-width: 768px) {
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
    @media only screen and (max-width: 768px) {
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
    return (
        <div
            style={{
                display: 'flex',

                borderBottom: 'solid 1px #e8e8e8',
            }}
        >
            {/* 로고 */}
            <Link to={'/'}>Logo</Link>
            <div
                style={{
                    width: '100%',
                }}
            >
                {/*메뉴바 컨테이너 */}
                <Navbar to={'/register'}>회원가입</Navbar>
                <Navbar to={'/'}>소개</Navbar>
                <Navbar to={'/post'}>게시판</Navbar>
                <Navbar to={'/login'}>로그인</Navbar>
            </div>
            <SideBtn>
                <MenuOpenSharpIcon
                    style={{ fontSize: '30px' }}
                    onClick={Drawopen}
                />
            </SideBtn>
            <div>
                <Drawer anchor="right" open={visible} onClose={DrawClose}>
                    <p
                        style={{
                            padding: '10px 140px 10px 30px ',
                            borderBottom: 'solid 1px #e8e8e8',
                        }}
                    >
                        Basic Drawer
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
                            history.push('/login');
                        }}
                    >
                        로그인
                    </SideMenu>
                </Drawer>
            </div>
        </div>
    );
}

export default NavBar;
