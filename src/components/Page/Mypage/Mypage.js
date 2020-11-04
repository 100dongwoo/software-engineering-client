import React from 'react';
import banner from './Mypagebanner.png';
import styled from 'styled-components';
import './GridList.css';
import GridLists from './GridLists';
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
const Button = styled.button`
    height: 10%;
    margin: auto 0;
`;
const GridContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
function Mypage(props) {
    const nextSlide = () => {
        const container = document.querySelector('.row__posters');
        sideScroll(container, 'right', 25, 300, 30);
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{ width: '100%', marginBottom: '50px' }}>
            <Image alt="Banner" src={banner} className="App-logo" />
            <Title>내 게시물</Title>
            <GridContainer>
                <Button id="slideBack" type="button" onClick={prevSlide}>
                    ?
                </Button>
                <div className="row__posters">
                    {test.map((test, index) => (
                        <GridLists test={test} key={index} />
                    ))}
                </div>
                <Button id="slide" type="button" onClick={nextSlide}>
                    >
                </Button>
            </GridContainer>

            <Title>내가 찜한 게시물</Title>
            <GridContainer>
                <Button id="slideBack" type="button" onClick={secondPrevSlide}>
                    ?
                </Button>
                <div className="second__posters">
                    {test.map((test, index) => (
                        <GridLists test={test} key={index} />
                    ))}
                </div>
                <Button id="slide" type="button" onClick={secondNextSlide}>
                    >
                </Button>
            </GridContainer>
        </div>
    );
}

export default Mypage;
