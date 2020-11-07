import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import api from '../../../api_manager';

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
    grid-template-columns: repeat(4, 1.2fr);
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;
    @media only screen and (max-width: 1650px) {
        grid-template-columns: repeat(3, 1.2fr);
    }
    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(2, 1.2fr);
    }
    @media only screen and (max-width: 650px) {
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
    @media only screen and (max-width: 375px) {
        min-width: 200px;
    }
`;
const SearchBtn = styled.button`
    color: #34558b;
    background-color: transparent;
    border: none;
    outline: none;
`;
const Topcontainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    justify-content: space-between;
`;

function PostPage(props) {
    const history = useHistory();
    const [search, setSearch] = useState('');
    const onSearchPost = (e) => {
        e.preventDefault();
        alert('검색', search);
    };
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        api.get('v1/posts/', page)
            .then((res) => {
                setPosts(res.data.results);
                // console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <Container>
            <Content>
                <LastFont>게시글</LastFont>
                <Topcontainer>
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
                        글 쓰기
                    </button>
                </Topcontainer>
                <button
                    onClick={() => {
                        history.push('/Contentpage');
                    }}
                >
                    게시글 보기
                </button>
                <GridContainer>
                    {posts.map((post, index) => (
                        <Post post={post} key={index} />
                    ))}
                </GridContainer>
            </Content>
        </Container>
    );
}

export default PostPage;
