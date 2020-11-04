import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
    width: 100%;
    height: 24.5rem;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 40px 100px rgba(125, 125, 125, 0.5);
    padding: 3% 3% 3% 3%;
    min-width: 400px;
`;
const Title = styled.p`
    font-size: 25px;
`;
const SubTitle = styled.p`
    font-size: 16px;
`;
function Post({ test }) {
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
                <Title>
                    {test.title.length > 20
                        ? test.title.slice(0, 20) + '...'
                        : test.title}
                </Title>
                <SubTitle>
                    {test.content.length > 48
                        ? test.content.slice(0, 48) + '...'
                        : test.content}
                </SubTitle>
            </div>
        </Container>
    );
}

export default Post;
