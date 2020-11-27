import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api, { extraApi } from '../../../api_manager';
import moment from 'moment';
import styled from 'styled-components';

//http://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&numOfRows=10&startPage=1&pageSize=10&pageNo=1

function ApiNotice(props) {
    const [publicNotices, setPublicNotices] = useState([]);
    const classes = styles();

    useEffect(() => {
        fetchPublicPosts();
    }, []);

    const fetchPublicPosts = () => {
        api.get('v1/public-posts/').then((res) => {
            if (!res.ok) {
                alert('공공데이터를 불러오는 데\n실패하였습니다.');
                return;
            }
            setPublicNotices(res.data);
        });
    };

    return (
        <Container>
            {publicNotices.map((publicNotice, i) => (
                <div key={i} className={classes.postContainer}>
                    {/*<p*/}
                    {/*    style={{ textDecoration: 'none' }}*/}
                    {/*>*/}
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            window.open(publicNotice?.url);
                        }}
                    >
                        {publicNotice?.title}
                    </p>
                    {/*</p>*/}
                    <p
                        style={{
                            color: '#adadad',
                            marginTop: '2rem',
                        }}
                    >
                        {moment(publicNotice?.createdAt, 'YYYYMMDD').format(
                            'YYYY-MM-DD'
                        )}
                    </p>
                </div>
            ))}
        </Container>
    );
}

export default ApiNotice;
const Container = styled.div`
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1.2fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    @media only screen and (max-width: 1024px) {
        grid-template-columns: repeat(1, 1.2fr);
        margin-top: 1rem;
    }
`;
const styles = makeStyles({
    postContainer: {
        border: '1px solid #adadad',
        borderRadius: 2,
        flexDirection: 'column',
        padding: '0px 16px',
        textAlign: 'center',
    },
});
