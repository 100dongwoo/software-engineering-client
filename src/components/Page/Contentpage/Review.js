import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
    width: 95%;
    height: auto;
    margin-top: 2rem;
     padding 1% 1%;
   
`;
const Avartar = styled.img`
    height: 4rem;
    width: 4rem;
    margin-right: 0.5rem;
    border-radius: 50%;
`;
const ReviewConainer = styled.div`
    border-bottom: 2px solid gray;
    width: 95%;
    height: auto;
`;

function Review({ reviews }) {
    return (
        <Container>
            {/*이미지, -이름 -시간*/}
            <ReviewConainer>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avartar
                        src="https://placeimg.com/40/50/anys"
                        alt="avartar"
                    />
                    <div>
                        <p>
                            유저이름: {reviews.user.nickname}
                            <br />
                            작성날짜 :
                            {moment(reviews.createAt).format('YYYY-MM-DD')}
                        </p>
                    </div>
                </div>
                <p>{reviews.content}</p>
            </ReviewConainer>
        </Container>
    );
}

export default Review;
