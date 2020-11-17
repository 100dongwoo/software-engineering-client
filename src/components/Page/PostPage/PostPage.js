import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import api from '../../../api_manager';
import InfiniteScroll from 'react-infinite-scroll-component';
import './InfiniteScroll.css';
import './Button.css';
import { withAuthContext } from '../../../context/AuthContext';
const Container = styled.div`
    width: 100%;
    padding-top: 2.5%;
    font-style: normal;
    font-weight: normal;
    margin-bottom: 3rem;
    margin-bottom: 30px;
`;
const LastFont = styled.p`
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 25px;
    margin-left: 15px;
`;
const GridContainer = styled.div`
    margin-bottom: 35px;
    cursor: pointer;
    display: grid;
    padding: 15px 15px 15px 15px;
    grid-template-columns: repeat(4, 1.2fr);
    grid-column-gap: 2rem;
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
    @media only screen and (max-width: 375px) {
        grid-template-columns: repeat(1, 1fr);
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
        padding: 0 0rem;
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

    margin-bottom: 30px;
    justify-content: space-between;
    padding: 15px 15px 15px 10px;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
let url = 'v1/posts/';
let onEndReached = false;

function PostPage(props) {
    const history = useHistory();
    const [keyword, setSearch] = useState('');

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        props.auth.fetchProfile();
        api.get(url, { page: 1 })
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                    return;
                }
                setPosts(res.data.results);
                setPage(page + 1);
                if (!res.data.next) {
                    onEndReached = true;
                }
                // console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const postNext = (page, keyword) => {
        if (keyword) {
            page = 1;
            setPage(1);
            onEndReached = false;
        }
        if (onEndReached) {
            return;
        }
        api.get(url, { page, keyword })
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                    return;
                }
                if (keyword) {
                    setPosts(res.data.results);
                } else {
                    setPosts([...posts, ...res.data.results]);
                }
                // setPosts(posts.concat(res.data.results));
                setPage(page + 1);
                if (res.data.next === null) {
                    onEndReached = true;
                }
                // setPosts(...(posts) => res.data.results);

                // console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Container>
            <Content>
                <LastFont>게시글</LastFont>
                <Topcontainer>
                    <SearhContainer>
                        <SearchBtn
                            onClick={(e) => {
                                e.preventDefault();
                                postNext(page, keyword);
                            }}
                        >
                            <SearchIcon />
                        </SearchBtn>
                        <Input
                            disableUnderline={true}
                            style={{ disableUnderline: true, width: '90%' }}
                            type="search"
                            placeholder="내용을 검색하세요"
                            value={keyword}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                    </SearhContainer>
                    {/*<button*/}
                    {/*    className="btn"*/}
                    {/*    onClick={() => {*/}
                    {/*        history.push('/Uploadpage');*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    글쓰기*/}
                    {/*</button>*/}
                    {props.auth.user.email !== '' && (
                        <button
                            className="fun-btn"
                            onClick={() => {
                                history.push('/Uploadpage');
                            }}
                        >
                            글 쓰 기
                        </button>
                    )}
                </Topcontainer>
                <InfiniteScroll
                    dataLength={posts.length}
                    hasMore={!onEndReached}
                    loader={onEndReached && <h4>Loading...</h4>}
                    next={() => postNext(page, keyword)}
                >
                    <GridContainer>
                        {posts.map((post, index) => (
                            <Post post={post} key={index} />
                        ))}
                    </GridContainer>
                </InfiniteScroll>
            </Content>
        </Container>
    );
}

export default withAuthContext(PostPage);
