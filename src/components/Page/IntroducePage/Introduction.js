import React from 'react';
import './Introduction.css';
import startup from './start-up1.png';
import startup2 from './start-up2.png';

// const Introduction = ({ name }) => {
const Introduction = (props) => {
    return (
        <>
            <div>
                <div className="logo">
                    <img
                        src={startup}
                        className="App-logo"
                        alt="logo"
                        style={{
                            marginLeft: 50,
                            marginRight: 50,
                            backgroundColor: '#34558b',
                        }}
                    />
                    <div>
                        <b>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
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
                        </b>
                        <div className="fonts">
                            <b>
                                <p style={{ fontSize: 20 }}>
                                    창업 정보는 Where?
                                </p>
                            </b>

                            <p>창업을 준비하는 사람들이 손쉽게</p>
                            <p>정보를 찾을 수 있도록 창업 정보를 공유합니다.</p>

                            <b>
                                <p style={{ fontSize: 32, color: '#34558b' }}>
                                    I can do it! Start-up
                                </p>
                            </b>
                            <hr></hr>
                        </div>
                    </div>
                    <img
                        src={startup2}
                        className="App-logo"
                        alt="logo"
                        style={{
                            marginLeft: 50,
                            marginRight: 50,
                            backgroundColor: '#34558b',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Introduction;
