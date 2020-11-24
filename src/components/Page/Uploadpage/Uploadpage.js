import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './Uploadpage.css';
import api from '../../../api_manager';
import { useHistory } from 'react-router-dom';

function Uploadpage(props) {
    const history = useHistory();
    const post = !!props.location.state? props.location.state.post : null;
    const [title, setTitle] = useState(post? post?.title : '');
    const [content, setContent] = useState(post? post?.content : '');
    const [file, setFile] = useState('');


    const params = {
        title,
        content,
    };
    const onRegister = (e) => {
        let request = post ? api.patch : api.post;
        let url = post ? `v1/posts/${post.id}/` : 'v1/posts/';
        e.preventDefault();
        request(url, params)
            .then((res) => {
                if (!res.ok) {
                    alert('업로드에 문제가 있습니다.');
                    return;
                }
                alert(`${post ? '수정' : '추가'}되었습니다.`);
                history.goBack();
            })
            .catch((err) => {
                alert(err);
            });
    };
    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <p className="Center">게시판</p>

            <TextField
                variant="filled"
                fullWidth
                value={title}
                placeholder="제목을 입력해주세요."
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />

            <TextField
                variant="filled"
                style={{ marginTop: '30px' }}
                value={content}
                multiline
                rows={20}
                fullWidth
                placeholder="내용을 입력해주세요."
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />

            <div className="FileUp">
                <p style={{ marginRight: '20px' }}>첨부 이미지</p>
                <input
                    style={{ cursor: 'pointer' }}
                    type="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                        setFile(e.target.value);
                    }}
                />
            </div>

            <div
                style={{
                    textAlign: 'center',
                    marginTop: 30,
                }}
            >
                <button className="ButtonStyle1" onClick={onRegister}>
                    {post ? '수정' : '등록'}
                </button>
                <button
                    className="ButtonStyle2"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default Uploadpage;
