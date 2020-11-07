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
                alert('업로드완료');
                history('/');
            })
            .catch((err) => {
                alert(err);
            });
    };
    return (
        <div className="Container">
            <p className="Center">게시판</p>
            <div className="UploadTitle">
                <TextField
                    variant="filled"
                    fullWidth
                    placeholder="제목을 입력해주세요."
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>
            <div className="UploadText">
                <TextField
                    variant="filled"
                    multiline
                    rows={20}
                    fullWidth
                    placeholder="내용을 입력해주세요."
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
            </div>

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

            <div className="Center1">
                <button className="ButtonStyle1" onClick={onRegister}>
                    등록
                </button>
                <button className="ButtonStyle2">취소</button>
            </div>
        </div>
    );
}

export default withAuthContext(Uploadpage);
