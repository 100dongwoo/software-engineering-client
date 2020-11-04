import React, { useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
const Container = styled.div`
    width: 100%;
    padding-top: 2.5%;
    font-style: normal;
    font-weight: normal;
    margin-bottom: 3rem;
`;
const LastFont = styled.div`
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 25px;
`;
const GridContainer = styled.div`
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(3, 1.2fr);
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;
    @media only screen and (max-width: 1268px) {
        grid-template-columns: repeat(2, 1.2fr);
    }
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(1, 1.2fr);
    }
`;
const Content = styled.div`
    max-width: 1640px;
    margin: auto;
    justify-content: space-between;
    @media only screen and (max-width: 1440px) {
        padding: 0 6.875rem;
    }
    @media only screen and (max-width: 1024px) {
        padding: 0 4.875rem;
    }
    @media only screen and (max-width: 768px) {
        padding: 0 2.875rem;
    }
    @media only screen and (max-width: 375px) {
        padding: 0 1rem;
    }
`;
const SearhContainer = styled.form`
    width: 30%;
    display: flex;
    border: 2px solid #34558b;
    border-radius: 40px;
    padding: 5px 10px;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
`;
const SearchBtn = styled.button`
    color: #34558b;
    background-color: transparent;
    border: none;
    outline: none;
`;

function PostPage(props) {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const onSearchPost = (e) => {
        e.preventDefault();
        alert('검색', search);
    };
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
        <Container>
            <Content>
                <LastFont>게시글</LastFont>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '30px',
                        justifyContent: 'space-between',
                    }}
                >
                    <SearhContainer>
                        <SearchBtn onClick={onSearchPost}>
                            <SearchIcon />
                        </SearchBtn>
                        <Input
                            disableUnderline={true}
                            style={{ disableUnderline: true, width: '90%' }}
                            type="search"
                            placeholder="내용을 검색하세요"
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                    </SearhContainer>
                    <button
                        onClick={() => {
                            history.push('/Uploadpage');
                        }}
                    >
                        게시글 쓰기
                    </button>
                </div>

                <GridContainer>
                    {test.map((information) => (
                        <Post test={information} />
                    ))}
                </GridContainer>
            </Content>
        </Container>
    );
}

export default PostPage;
