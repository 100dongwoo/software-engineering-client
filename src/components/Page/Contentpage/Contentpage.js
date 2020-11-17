import React, { useEffect, useState } from 'react';
import './Contentpage.css';
import api from '../../../api_manager';

function Contentpage(props) {
    const postid = props.match.params.postid; ///URL 에서 가져옴
    const [post, setPost] = useState({});
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetchPost();
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        api.get(`v1/posts/${postid}/reviews/`)
            .then((res) => {
                if (!res.ok) {
                    alert('error');
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
                    alert('error');
                }
                setPost(res.data);
            })
            .catch((err) => {
                console.log('post' + err);
            });
    };

    const onDeletePost = () => {
        api.delete(`v1/posts/${postid}/`).then(res=> {
                if (!res.ok) {
                    alert('게시물 삭제에 실패하였습니다.');
                    return;
                }
                alert('게시물이 삭제되었습니다.');
                props.history.goBack();
            }
        )
    };

    return (
        <div className="Container">
            {/*<p className="Banner">L.o.g.o</p>*/}
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
                            {post.isMine &&
                                <>
                            <button>수정</button>
                            <button onClick={onDeletePost}>삭제</button>
                            </>
                            }
                            <button>찜(즐찾 뀨!)</button>
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
                    <p className="PostNameDate">작성 날짜 : {post.createdAt}</p>
                </div>
                {/* 경계선*/}
                <div className="PostBoxLine" />
                {/*게시글 내용 컨테이너*/}
                <p className="PostDate">{post.content}</p>
            </div>
        </div>
    );
}

export default Contentpage;
