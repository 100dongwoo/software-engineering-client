import React, { useEffect, useState } from 'react';
import './Contentpage.css';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';
import Review from './Review';
import styled from 'styled-components';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const ReviewContent = styled.div`
    width: 100%;
    max-height: 700px;
    overflow: scroll;
    padding-left: 2%;
    padding-right: 1%;
    ::-webkit-scrollbar {
        display: none;
    }
`;
export const ReviewArea = styled.textarea`
    width: 95%;
    resize: none;
    height: 150px;
    padding: 1% 1%;
    overflow: hidden;
    border: 2px solid #adadad;
    background-color: #fafafa;
    font-size: 1.2rem;
    ::placeholder {
        color: #adadad;
        font-style: normal;
        line-height: 157.5%;
    }
`;
const ReviewSubmitBtn = styled.button`
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    margin-right: 1.5%;
    background-image: linear-gradient(
        to right,
        #314755 0%,
        #26a0da 51%,
        #314755 100%
    );
    border: none;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    margin-top: 1rem;
    font-style: normal;
    font-weight: normal;
    line-height: 116%;
    display: block;
    :hover {
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
`;

function Contentpage(props) {
    const postid = props.match.params.postid; ///URL 에서 가져옴
    const [post, setPost] = useState({});
    const [reviews, setReviews] = useState([]);
    const [content, setContent] = useState('');

    const onSubmitReview = (e) => {
        let params = {
            content: content,
            // user: props.auth.user.id,
        };
        e.preventDefault();
        if (!props.auth.user.id) {
            alert('로그인후 이용 가능합니다');
            return;
        } else if (content.length === 0) {
            alert('댓글을 작성해주세요(빈칸 금지)');
            return;
        }
        api.post(`v1/posts/${postid}/reviews/`, params).then((res) => {
            if (!res.ok) {
                alert('댓글작성에 실패하였습니다.');
                return;
            }
            console.log(res);
            fetchReviews();
            setContent('');
            alert('댓글작성 완료');
        });
    };
    useEffect(() => {
        props.auth.fetchProfile();
        fetchPost();
        fetchReviews();
    }, [reviews?.length]);

    const fetchReviews = () => {
        api.get(`v1/posts/${postid}/reviews/`)
            .then((res) => {
                if (!res.ok) {
                    alert('리뷰데이터를 불러오는 데 실패하였습니다.');
                    return;
                }
                setReviews(res.data.results);
            })
            .catch((err) => {
                console.log('리뷰' + err);
            });
    };

    const fetchPost = () => {
        api.get(`v1/posts/${postid}/`)
            .then((res) => {
                if (!res.ok) {
                    alert('게시물정보를 불러오는 데 실패하였습니다.');
                    return;
                }
                setPost(res.data);
            })
            .catch((err) => {
                console.log('post' + err);
            });
    };

    const onUpdatePost = () => {
        props.history.push({ pathname: '/Uploadpage', state: { post } });
    };

    const onDeletePost = () => {
        api.delete(`v1/posts/${postid}/`).then((res) => {
            if (!res.ok) {
                alert('게시물 삭제에 실패하였습니다.');
                return;
            }
            alert('게시물이 삭제되었습니다.');
            props.history.goBack();
        });
    };

    const onChangeFavorite = (hasFavorite) => {
        api.get(
            `v1/posts/${postid}/${hasFavorite ? 'unfavorite' : 'favorite'}/`
        ).then((res) => {
            if (!res.ok) {
                alert('찜목록 업데이트에 실패하였습니다.');
                return;
            }
            if (hasFavorite) {
                setPost(Object.assign({}, post, { hasFavorite: false }));
            } else {
                setPost(Object.assign({}, post, { hasFavorite: true }));
            }
            alert('찜목록이 업데이트되었습니다.');
        });
    };
    return (
        <div className="Container">
            <div className="PostBox">
                {/*상단 컨테이너*/}
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <p className="PostName">{post.title}</p>
                        <div>
                            {post.isMine && (
                                <div
                                    style={{
                                        textAlign: 'right',
                                    }}
                                >
                                    <Tooltip title="수정">
                                        <IconButton
                                            aria-label="수정"
                                            onClick={onUpdatePost}
                                        >
                                            <BorderColorOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton
                                            aria-label="삭제"
                                            onClick={onDeletePost}
                                        >
                                            <DeleteIcon />
                                            {/*<button onClick={onUpdatePost}>수정</button>*/}
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )}
                            {
                                !post.isMine &&
                                    !!props.auth.user?.id &&
                                    (post.hasFavorite ? (
                                        <Tooltip title="찜 삭제">
                                            <FavoriteOutlinedIcon
                                                aria-label="찜삭제"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    onChangeFavorite(
                                                        post.hasFavorite
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="찜 추가">
                                            <FavoriteBorderOutlinedIcon
                                                aria-label="찜 추가"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    onChangeFavorite(
                                                        post.hasFavorite
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    ))
                                // </Tooltip>
                            }

                            {/*<Tooltip title="수정">*/}
                            {/*    <IconButton*/}
                            {/*        aria-label="수정"*/}
                            {/*        onClick={() => {*/}
                            {/*            if (isUpdateClicked) {*/}
                            {/*                onUpdateReview(reviewContent);*/}
                            {/*            }*/}
                            {/*            setIsUpdateClicked(true);*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <BorderColorOutlinedIcon />*/}
                            {/*    </IconButton>*/}
                            {/*</Tooltip>*/}

                            {/*{!post.isMine && !!props.auth.user?.id && (*/}
                            {/*    // <FavoriteOutlinedIcon/>*/}
                            {/*    <button*/}
                            {/*        onClick={() =>*/}
                            {/*            onChangeFavorite(post.hasFavorite)*/}
                            {/*        }*/}
                            {/*    >{`찜 ${*/}
                            {/*        post.hasFavorite ? '삭제' : '추가'*/}
                            {/*    }`}</button>*/}
                            {/*)}*/}
                        </div>
                    </div>
                    <img
                        className="PostNameImage"
                        src={
                            post?.user?.image
                                ? post?.user?.image
                                : 'https://placeimg.com/40/50/anys'
                        }
                        alt="avatar"
                    />
                    <p className="PostNameDate">{post?.user?.nickname}</p>
                    <p className="PostNameDate">
                        {moment(post.createdAt).format('YYYY-MM-DD')}
                    </p>
                </div>
                {/* 경계선*/}
                <div className="PostBoxLine" />
                {/*게시글 내용 컨테이너*/}
                <p className="PostDate">{post.content}</p>
            </div>
            <ReviewContent>
                {reviews.map((review, index) => (
                    <Review
                        review={review}
                        key={index}
                        postId={postid}
                        fetchReviews={fetchReviews}
                    />
                ))}
            </ReviewContent>
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    margin: 'auto',
                    marginTop: '2.5rem',
                }}
            >
                <ReviewArea
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    value={content}
                    placeholder="댓글을 작성해주세요"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ReviewSubmitBtn onClick={onSubmitReview}>
                        작 성
                    </ReviewSubmitBtn>
                </div>
            </div>
        </div>
    );
}

export default withAuthContext(Contentpage);
