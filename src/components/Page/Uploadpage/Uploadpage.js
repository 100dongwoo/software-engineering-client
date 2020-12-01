import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './Uploadpage.css';
import api from '../../../api_manager';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
import styled from 'styled-components';

function Uploadpage(props) {
    const history = useHistory();
    const post = !!props.location.state ? props.location.state.post : null;
    const [title, setTitle] = useState(post ? post?.title : '');
    const [content, setContent] = useState(post ? post?.content : '');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const classes = useStyles();

    const onRegister = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('title', title);
        form.append('content', content);
        if (!!file) {
            form.append('image', file);
        }
        let request = post ? api.patch : api.post;
        let url = post ? `v1/posts/${post.id}/` : 'v1/posts/';

        request(url, form)
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
                className={classes.TextField}
                fullWidth
                value={title}
                placeholder="제목을 입력해주세요."
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />

            <TextField
                className={classes.TextField}
                style={{
                    marginTop: '30px',
                    border: '1px solid #adadad',
                    marginBottom: '0.7rem',
                }}
                value={content}
                multiline
                rows={20}
                fullWidth
                placeholder="내용을 입력해주세요."
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            {preview && <Preview src={preview} alt="previewImage" />}
            <div className="FileUp">
                <p style={{ marginRight: '20px' }}>첨부 이미지</p>
                <label className="input-file-button" htmlFor="input-file">
                    업로드
                </label>
                <input
                    id="input-file"
                    style={{ display: 'none' }}
                    type="file"
                    // name="file"
                    // accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                        // setFile(e.target.value);
                        e.preventDefault();

                        let reader = new FileReader();
                        let file = e.target.files[0];
                        reader.onloadend = () => {
                            setFile(file);
                            setPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                    }}
                />
            </div>

            <div
                style={{
                    marginTop: '1.3rem',
                    textAlign: 'center',
                }}
            >
                <button
                    className="enrollmentModify"
                    onClick={(e) => {
                        if (title === '' || content === '') {
                            alert('내용을 입력해주세요!');
                            return;
                        }
                        onRegister(e);
                    }}
                    style={{ marginRight: 30 }}
                >
                    {post ? '수 정' : '등 록'}
                </button>
                <button
                    className="cancle"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    취 소
                </button>
            </div>
        </div>
    );
}

export default Uploadpage;
const Preview = styled.img`
    width: 12.5rem;
    height: 12.5rem;
    margin: 1.5rem 0;
    @media only screen and (max-width: 1024px) {
    }
`;

const useStyles = makeStyles({
    TextField: {
        padding: '8px 2px',
        borderRadius: 2,
    },
});
