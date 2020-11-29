import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const Container = styled.div`
    width: 100%;
    height: 24.5rem;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 40px 100px rgba(125, 125, 125, 0.5);
    min-width: 100%;
    &: hover {
        transform: scale(1.1);
    }
`;
const Title = styled.p`
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;
const SubTitle = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;
function Post({ post }) {
    const history = useHistory();
    return (
        <Container onClick={() => history.push(`/post/${post.id}`)}>
            <img
                alt="이미지"
                // src={`https://placeimg.com/700/700/${
                //     Math.random() * (100 - 1) + 1
                // }`}
                src="https://placeimg.com/700/700/anys"
                style={{
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '65%',
                    // borderRadius: '15px',
                }}
            />
            <div
                style={{
                    height: '35%',
                    padding: '0 10px 0 10px ',
                }}
            >
                <strong>
                    <Title>{post.title}</Title>
                </strong>
                <SubTitle>{post.content}</SubTitle>
            </div>
        </Container>
    );
}

export default Post;
