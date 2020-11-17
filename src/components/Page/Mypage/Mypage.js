import React, { useEffect, useState } from 'react';
import banner from './Mypagebanner.png';
import styled from 'styled-components';
import './GridList.css';
import GridLists from './GridLists';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api_manager';
const Title = styled.p`
    text-align: left;
    font-size: 30px;
    margin-left: 3%;
    margin-bottom: 1.5rem;
`;
const Image = styled.img`
    height: 15vh;
    pointer-events: none;
    width: 100%;
    margin-bottom: 12px;
    margin-top: 25px;
`;

const GridContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Avartar = styled.img`
    border-radius: 50%;
    max-width: 200px;
`;
const IntroduceFont = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    margin-left: 5%;
`;
const useStyles = makeStyles({
    TabBtn: {
        margin: 'auto 0',
        maxWidth: '10px',
    },
});
function Mypage(props) {
    const classes = useStyles();
    const userId = props.match.params.id; ///URL 에서 가져옴
    const [myPosts, setMyPosts] = useState([]);
    const [myFavoritePosts, setMyFavoritePosts] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchFavoritePosts();
    }, []);

    const fetchPosts = () => {
        api.get(`v1/posts/`, { user: userId })
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                }
                setMyPosts(res.data.results);
            })
            .catch((err) => {
                console.log('post' + err);
            });
    };

    const fetchFavoritePosts = () => {
        api.get(`v1/posts/`, { favoriteUser: userId })
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                }
                setMyFavoritePosts(res.data.results);
            })
            .catch((err) => {
                console.log('post' + err);
            });
    };

    const nextSlide = () => {
        const container = document.querySelector('.row__posters');
        sideScroll(container, 'right', 25, 300, 20);
    };

    const prevSlide = () => {
        const container = document.querySelector('.row__posters');
        sideScroll(container, 'left', 25, 300, 30);
    };
    const secondNextSlide = () => {
        const container = document.querySelector('.second__posters');
        sideScroll(container, 'right', 25, 300, 30);
    };

    const secondPrevSlide = () => {
        const container = document.querySelector('.second__posters');
        sideScroll(container, 'left', 25, 300, 30);
    };
    const sideScroll = (element, direction, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            if (direction === 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }
        }, speed);
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
        <div style={{ width: '100%', marginBottom: '50px' }}>
            <Image alt="Banner" src={banner} className="App-logo" />{' '}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ textAlign: 'center', marginLeft: '1%' }}>
                    <div>
                        <Avartar
                            alt="Avartar"
                            src="https://placeimg.com/700/700/anys"
                        />
                    </div>
                    <button>수정</button>
                </div>
                <IntroduceFont>안녕하세요 ㄴㅁㅇㄴㅁㅇㄴㅁ</IntroduceFont>
            </div>
            <Title>내 게시물</Title>
            <GridContainer>
                <TabScrollButton
                    className={classes.TabBtn}
                    onClick={prevSlide}
                    direction="left"
                    orientation="horizontal"
                />

                <div className="row__posters">
                    {test.map((test, index) => (
                        <GridLists test={test} key={index} />
                    ))}
                </div>
                <TabScrollButton
                    className={classes.TabBtn}
                    onClick={nextSlide}
                    direction="right"
                    orientation="horizontal"
                />
            </GridContainer>
            <Title>내가 찜한 게시물</Title>
            <GridContainer>
                <TabScrollButton
                    className={classes.TabBtn}
                    onClick={secondPrevSlide}
                    direction="left"
                    orientation="horizontal"
                />
                <div className="second__posters">
                    {test.map((test, index) => (
                        <GridLists test={test} key={index} />
                    ))}
                </div>

                <TabScrollButton
                    className={classes.TabBtn}
                    onClick={secondNextSlide}
                    direction="right"
                    orientation="horizontal"
                />
            </GridContainer>
        </div>
    );
}

export default Mypage;
