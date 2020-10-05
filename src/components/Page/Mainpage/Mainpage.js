import React, { useEffect } from 'react';
import './Mainpage.css';
import startup from './start-up1.png';
import startup2 from './start-up2.png';
import { withAuthContext } from '../../../context/AuthContext';

// const Introduction = ({ name }) => {
const Mainpage = (props) => {
    const user = props.auth.user;
    useEffect(() => {}, []);

    return (
        <div className="logo" id="qwe">
            <img src={startup} alt="logo" />
            <div className="Intro">
                <div
                    className="IntroFont"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <p className="a">M</p>
                    <p className="fonts">an&ensp;</p>
                    <p className="a">S</p>
                    <p className="fonts">haring&ensp;</p>
                    <p className="a">S</p>
                    <p className="fonts">tart-up&ensp;</p>
                    <p className="a">I</p>
                    <p className="fonts">nformation&ensp;</p>
                </div>

                <div className="fonts">
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                        창업 정보는 Where?
                    </p>

                    <p>
                        창업을 준비하는 사람들이 손쉽게 <br />
                        <br /> 정보를 찾을 수 있도록 창업 정보를 공유합니다.
                    </p>

                    <p
                        style={{
                            fontSize: '2rem',
                            color: '#34558b',
                            fontWeight: 'bold',
                        }}
                    >
                        I can do it! Start-up
                    </p>
                </div>
            </div>

            <img src={startup2} alt="logo" />
        </div>
    );
};

export default withAuthContext(Mainpage);
