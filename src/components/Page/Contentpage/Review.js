import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import api from '../../../api_manager';
import {withAuthContext} from '../../../context/AuthContext';

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

function Review(props) {
    const {review, postId, fetchReviews} = props;

    const onDeleteReview = () => {
        api.delete(`v1/posts/${postId}/reviews/${review.id}/`).then((res) => {
            if (!res.ok) {
                alert('리뷰 삭제에 실패하였습니다.');
                return;
            }
            alert('리뷰가 삭제되었습니다.');
            fetchReviews();
        });
    };

    return (
        <Container>
            {/*이미지, -이름 -시간*/}
            <ReviewConainer>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avartar
                            src="https://placeimg.com/40/50/anys"
                            alt="avartar"
                        />
                        <p style={{marginLeft: '0.5rem'}}>
                            유저이름: {review.user.nickname}
                            <br />
                            작성날짜 :
                            {moment(review.createAt).format('YYYY-MM-DD')}
                        </p>
                        {console.log(review.user.id, props.auth.user.id)}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {review?.user?.id === props.auth.user?.id &&
                        <div>
                            <button>수정</button>
                            <button onClick={onDeleteReview}>삭제</button>
                        </div>}
                    </div>
                </div>
                <p>{review.content}</p>
            </ReviewConainer>
        </Container>
    );
}

export default withAuthContext(Review);
