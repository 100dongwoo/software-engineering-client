import React from 'react';
import banner from './Mypagebanner.png';
import './Mypage.css';
import GridLists from './GridLists';
import styled from 'styled-components';
const Title = styled.p`
    text-align: left;
    font-size: 30px;
    margin-bottom: 1.5rem;
`;
function Mypage(props) {
    const test = [
        {
            title: '222222222222222222222', //제목
            content:
                '예시입니다예시입니다예시입니다예시입니다예시입니다예예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다예시입니다시입니다예시입니다예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
        {
            title: '카페 정보 공유합니다!!!!!!', //제목
            content: '예시입니다?', //상세내용
        },
    ];
    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <img alt="Banner" src={banner} className="App-logo" />
            <Title>내 게시물</Title>
            <GridLists test={test} />
            <Title>내가 찜한 게시물</Title>
            <GridLists test={test} />
        </div>
    );
}

export default Mypage;
