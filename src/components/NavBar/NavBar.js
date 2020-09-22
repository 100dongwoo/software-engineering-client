import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <div style={{ display: 'flex' }}>
            <Link style={{ marginRight: 20 }} to={'/'}>
                메인페이지
            </Link>
            <Link style={{ marginRight: 20 }} to={'/login'}>
                로그인
            </Link>
            <Link style={{ marginRight: 20 }} to={'/register'}>
                회원가입asdfdsafds
            </Link>
        </div>
    );
}

export default NavBar;
