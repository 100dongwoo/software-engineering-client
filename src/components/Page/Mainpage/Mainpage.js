import React, { useEffect } from 'react';
import './Mainpage.css';
import startup3 from './Illustration left (2).png';
import startup4 from './Illustration right (1).png';
import { withAuthContext } from '../../../context/AuthContext';
import styled from 'styled-components';
const Container = styled.div`
    margin-top: 3%;
    background: #fefefe;
    box-shadow: 0px 40px 100px rgba(125, 125, 125, 0.5);
    border-radius: 60px;
    display: flex;
    height: 80vh;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 768px) {
        height: 100%;
    }
`;
const Img = styled.img`
    height: 72%;
    width: 25%;
    @media only screen and (max-width: 768px) {
        margin-bottom: 5%;
        margin-top: 5%;
        width: 80%;
    }
`;

// const Introduction = ({ name }) => {
const Mainpage = (props) => {
    const user = props.auth.user;
    useEffect(() => {}, []);

    return (
        <Container className="logo" id="qwe">
            <Img src={startup3} alt="logo" />
            <div className="Intro">
                <div
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

                    <p className="bigFont">I can do it! Start-up</p>
                </div>
            </div>

            <Img src={startup4} alt="logo" />
        </Container>
    );
};

export default withAuthContext(Mainpage);
