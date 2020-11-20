import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const Container = styled.div`
    width: 100%;
    height: 24.4rem;
    cursor: pointer;
    background: #ffffff;
    border-radius: 15px;
    // box-shadow: 0px 40px 100px rgba(125, 25, 225, 0.5);
    border: 1px solid #adadad;
    margin-right: 27px;
    min-width: 295px;
    width: 295px;
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

function GridLists({ post }) {
    const history = useHistory();
    return (
        <Container onClick={() => history.push(`/post/${post.id}`)}>
            <img
                alt="이미지"
                src="https://placeimg.com/700/700/anys"
                style={{
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '65%',
                }}
            />
            <div
                style={{
                    height: '35%',
                    padding: '0 10px 0 10px ',
                }}
            >
                <Title>{post.title}</Title>
                <SubTitle>{post.content}</SubTitle>
            </div>
        </Container>
    );
}

export default GridLists;
