import React from 'react';
import banner from './Mypagebanner.png';
import './Mypage.css';
function Mypage(props) {
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <img src={banner} className="App-logo"></img>

            <hr></hr>
        </div>
    );
}

export default Mypage;
