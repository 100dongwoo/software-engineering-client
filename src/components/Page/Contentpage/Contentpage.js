import React, { useEffect, useState } from 'react';
import './Contentpage.css';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';
import Review from './Review';
import styled from 'styled-components';
import moment from 'moment';

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
const TextArea = styled.textarea`
    width: 95%;
    resize: none;
    height: 150px; padding 1% 1%;
    overflow: hidden;
    border: 2px solid #adadad;
    background-color: #fafafa;
    font-size:1.2rem;
     ::placeholder {
        color: #adadad;
        font-style: normal;
        line-height: 157.5%;
        color: #bebebe;
    }
`;
const ReviewSubmitBtn = styled.button`
    font-size: 1rem;
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
    let params = {
        content: content,
        user: props.auth.user.id,
    };
    const onSubmitReview = (e) => {
        if (props.auth.user.id === '') {
            alert('로그인후 이용 가능합니다');
            return;
        }
        if (content === '') {
            alert('댓글을 작성해주세요(빈칸 금지)');
            return;
        }
        e.preventDefault();
        api.post(`v1/posts/${postid}/reviews`, params).then((res) => {
            if (!res.ok) {
                alert('댓글작성이 실패하였습니다.');
                return;
            }
            console.log(res);
            setContent('');
            alert('댓글작성 완료');
        });
    };
    useEffect(() => {
        props.auth.fetchProfile();
        fetchPost();
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        api.get(`v1/posts/${postid}/reviews/`)
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                }
                console.log('12321321321', res.data.results);
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
                    alert('error');
                }
                setPost(res.data);
            })
            .catch((err) => {
                console.log('post' + err);
            });
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

    const array = [
        {
            content: 123231213,
        },
        {
            content: 123231213,
        },
        {
            content: 123231213,
        },
        {
            content: 123231213,
        },
        {
            content: 123231213,
        },
    ];
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
                                <>
                                    <button>수정</button>
                                    <button onClick={onDeletePost}>삭제</button>
                                </>
                            )}
                            {!post.isMine && !!props.auth.user?.id && (
                                <button
                                    onClick={() =>
                                        onChangeFavorite(post.hasFavorite)
                                    }
                                >{`찜 ${
                                    post.hasFavorite ? '삭제' : '추가'
                                }`}</button>
                            )}
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
                    <p className="PostNameDate">
                        작성자 이름 : {post?.user?.nickname}
                    </p>
                    <p className="PostNameDate">
                        작성 날짜 :{' '}
                        {moment(post.createdAt).format('YYYY-MM-DD')}
                    </p>
                </div>
                {/* 경계선*/}
                <div className="PostBoxLine" />
                {/*게시글 내용 컨테이너*/}
                <p className="PostDate">{post.content}</p>
            </div>
            <ReviewContent>
                {array.map((arr, index) => (
                    <Review arr={arr} key={index} />
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
                <TextArea
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
