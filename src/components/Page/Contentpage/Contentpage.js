import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './Contentpage.css';

function Contentpage(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    return (
        <div className="Container">
            <p className="Banner">L.o.g.o</p>
            <div className="PostBox">
                <p className="PostName">게시글 제목</p>
                <p className="PostNameImage"></p>
                <p className="PostNameDate">작성자 이름</p>
                <p className="PostNameDate">작성 날짜</p>
                <p className = "PostBoxLine"> </p>
                <p className = "PostDate">게시글 내용</p>
            </div>
        </div>
    );
}

export default Contentpage;