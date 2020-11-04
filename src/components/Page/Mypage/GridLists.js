import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    height: 24.5rem;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 40px 100px rgba(125, 225, 225, 0.5);
    padding: 1% 1% 1% 1%;
    margin-right: 27px;
    min-width: 260px;
    &: hover {
        transform: scale(1.1);
    }
`;
const Title = styled.p`
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;
const SubTitle = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;
function GridLists({ test }) {
    return (
        <Container>
            <img
                alt="이미지"
                src="https://placeimg.com/700/700/anys"
                style={{
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '65%',
                    borderRadius: '15px',
                }}
            />
            <div
                style={{
                    height: '35%',
                    padding: '0 10px 0 10px ',
                }}
            >
                <Title>{test.title}</Title>
                <SubTitle>{test.content}</SubTitle>
            </div>
        </Container>
    );
}

export default GridLists;