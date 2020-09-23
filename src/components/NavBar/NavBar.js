import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    &:hover {
        color: #ff534b;
        border-bottom: 2px solid #ff534b;
    }
    color: #181717;
`;

function NavBar(props) {
    return (
        <div
            style={{
                display: 'flex',

                borderBottom: 'solid 1px #e8e8e8',
            }}
        >
            <div>
                {/* 로고 */}
                <Link to={'/'}>Logo</Link>
            </div>
            <div
                style={{
                    width: '100%',
                    paddingRight: '4%',
                }}
            >
                {/*메뉴바 컨테이너 */}
                <Navbar to={'/register'} style={{ padding: ' 15px 40px' }}>
                    회원가입
                </Navbar>
                <Navbar to={'/introduce'}>소개</Navbar>
                <Navbar to={'/post'}>게시판</Navbar>
                <Navbar to={'/login'}>로그인</Navbar>
            </div>
        </div>
    );
}

export default NavBar;
