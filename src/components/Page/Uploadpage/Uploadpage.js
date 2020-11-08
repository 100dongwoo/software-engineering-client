import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './Uploadpage.css';
import api from '../../../api_manager';
import { useHistory } from 'react-router-dom';

function Uploadpage(props) {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const params = {
        title,
        content,
    };
    const onRegister = (e) => {
        e.preventDefault();
        api.post('v1/posts/', params)
            .then((res) => {
                if (!res.ok) {
                    alert('업로드 실패');
                    return;
                }
                alert('업로드 완료');
                history('/');
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
                placeholder="제목을 입력해주세요."
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />

            <TextField
                style={{ marginTop: '30px' }}
                variant="filled"
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
                    등록
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
