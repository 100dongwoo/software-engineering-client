import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';
import { ReviewArea } from './Contentpage';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
const Container = styled.div`
    width: 95%;
    height: auto;
    margin-top: 2rem;
    padding: 1% 1%;
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
const ReviewIconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
function Review(props) {
    const { review, postId, fetchReviews } = props;
    const [isUpdateClicked, setIsUpdateClicked] = useState(false);
    const [reviewContent, setReviewContent] = useState(review.content);

    const onUpdateReview = (content) => {
        api.patch(`v1/posts/${postId}/reviews/${review.id}/`, { content }).then(
            (res) => {
                if (!res.ok) {
                    alert('리뷰 업데이트에 실패하였습니다.');
                    return;
                }
                setIsUpdateClicked(false);
                alert('리뷰가 업데이트되었습니다.');
                fetchReviews();
            }
        );
    };

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
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avartar
                            src={
                                review.user.image
                                    ? review.user.image
                                    : 'https://placeimg.com/40/50/anys'
                            }
                            alt="avartar"
                        />
                        <p style={{ marginLeft: '0.5rem' }}>
                            {review.user.nickname}
                            <br />
                            {moment(review.createAt).format('YYYY-MM-DD')}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {review?.user?.id === props.auth.user?.id && (
                            <ReviewIconContainer>
                                <div>
                                    <Tooltip title="수정">
                                        <IconButton
                                            aria-label="수정"
                                            onClick={() => {
                                                if (isUpdateClicked) {
                                                    onUpdateReview(
                                                        reviewContent
                                                    );
                                                }
                                                setIsUpdateClicked(true);
                                            }}
                                        >
                                            <BorderColorOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="삭제">
                                        <IconButton
                                            aria-label="삭제"
                                            onClick={onDeleteReview}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </ReviewIconContainer>
                        )}
                    </div>
                </div>
                {isUpdateClicked ? (
                    <ReviewArea
                        onChange={(e) => {
                            setReviewContent(e.target.value);
                        }}
                        value={reviewContent}
                        placeholder="댓글을 작성해주세요"
                    />
                ) : (
                    <p>{reviewContent}</p>
                )}
            </ReviewConainer>
        </Container>
    );
}

export default withAuthContext(Review);
