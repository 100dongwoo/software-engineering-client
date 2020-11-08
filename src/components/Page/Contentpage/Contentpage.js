import React, { useState } from 'react';
import './Contentpage.css';

function Contentpage(props) {
    return (
        <div className="Container">
            {/*<p className="Banner">L.o.g.o</p>*/}
            <div className="PostBox">
                {/*상단 컨테이너*/}
                <div>
                    <p className="PostName">게시글 제목</p>
                    <img
                        className="PostNameImage"
                        src="https://placeimg.com/40/50/anys"
                        alt="avatar"
                    />
                    <p className="PostNameDate">작성자 이름 : 김재훈</p>
                    <p className="PostNameDate">작성 날짜 : 2020-02-02</p>
                </div>
                {/* 경계선*/}
                <div className="PostBoxLine" />
                {/*게시글 내용 컨테이너*/}
                <p className="PostDate">게시글 내용</p>
            </div>
        </div>
    );
}

export default Contentpage;
