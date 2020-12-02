import React, { useEffect, useState } from 'react';
import banner from './Mypagebanner.png';
import styled from 'styled-components';
import './GridList.css';
import GridLists from './GridLists';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api_manager';
import { withAuthContext } from '../../../context/AuthContext';

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
const Message = styled.p`
    font-style: normal;
    font-size: 1rem;

    line-height: 150%;
    margin-left: 4%;
`;
const TopContainer = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
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
    const user = props.auth.user;
    const [file, setFile] = useState('');

    useEffect(() => {
        console.log(props);
        props.auth.fetchProfile();
        fetchPosts();
        fetchFavoritePosts();
    }, []);

    const fetchPosts = () => {
        api.get(`v1/posts/`, { user: userId })
            .then((res) => {
                if (!res.ok) {
                    alert('error');
                    return;
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
                    return;
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

    return (
        <div style={{ width: '100%', marginBottom: '50px' }}>
            <Image alt="Banner" src={banner} className="App-logo" />{' '}
            <TopContainer
            // style={{
            //     display: 'flex',
            //     alignItems: 'center',
            // }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        marginLeft: '1%',
                        padding: '16px 0',
                    }}
                >
                    <div style={{ marginBottom: 8 }}>
                        <Avartar
                            alt="Avartar"
                            src={
                                !!user?.image
                                    ? user?.image
                                    : 'https://placeimg.com/700/700/anys'
                            }
                        />
                    </div>
                    <div className="wrap">
                        <label
                            className="button "
                            htmlFor="input-file"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',

                                alignItems: 'center',
                            }}
                        >
                            수 정
                        </label>
                    </div>
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
                            let form = new FormData();

                            reader.onloadend = () => {
                                setFile(file);
                                form.append('image', e.target.files[0]);
                                props.auth.patchProfile(form).then((res) => {
                                    if (!res.ok) {
                                        alert(
                                            '프로필 업데이트에 실패하였습니다.'
                                        );
                                        return;
                                    }
                                    alert('프로필이 업데이트되었습니다.');
                                });
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <IntroduceFont>닉네임 : Luke</IntroduceFont>
                    <IntroduceFont>휴대폰 번호 : 010-1111-1234</IntroduceFont>
                    <IntroduceFont>
                        이 메 일 : qqwekfjnwe@ccc.cccc
                    </IntroduceFont>
                </div>
            </TopContainer>
            <Title>나의 창업정보 게시물</Title>
            {myPosts.length !== 0 ? (
                <GridContainer>
                    <TabScrollButton
                        className={classes.TabBtn}
                        onClick={prevSlide}
                        direction="left"
                        orientation="horizontal"
                    />

                    <div className="row__posters">
                        {myPosts.map((post, index) => (
                            <GridLists post={post} key={index} />
                        ))}
                    </div>
                    <TabScrollButton
                        className={classes.TabBtn}
                        onClick={nextSlide}
                        direction="right"
                        orientation="horizontal"
                    />
                </GridContainer>
            ) : (
                <Message>아직 게시물이 없습니다. 게시글 작성해주세요!</Message>
            )}
            <Title>내가 찜한 창업정보</Title>
            {myFavoritePosts.length !== 0 ? (
                <GridContainer>
                    <TabScrollButton
                        className={classes.TabBtn}
                        onClick={secondPrevSlide}
                        direction="left"
                        orientation="horizontal"
                    />
                    <div className="second__posters">
                        {myFavoritePosts.map((post, index) => (
                            <GridLists post={post} key={index} />
                        ))}
                    </div>

                    <TabScrollButton
                        className={classes.TabBtn}
                        onClick={secondNextSlide}
                        direction="right"
                        orientation="horizontal"
                    />
                </GridContainer>
            ) : (
                <Message>아직 찜한 창업정보가 없습니다!</Message>
            )}
        </div>
    );
}

export default withAuthContext(Mypage);
