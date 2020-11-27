import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api, { extraApi } from '../../../api_manager';
import moment from 'moment';

//http://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&numOfRows=10&startPage=1&pageSize=10&pageNo=1

function ApiNotice(props) {
    const [publicNotices, setPublicNotices] = useState([]);
    const classes = styles();

    useEffect(() => {
        fetchPublicPosts()
    }, []);

    const fetchPublicPosts = () => {
        api.get('v1/public-posts/').then(res=>{
            if (!res.ok) {
                alert('공공데이터를 불러오는 데\n실패하였습니다.');
                return;
            }
            setPublicNotices(res.data);
        })
    };

    return (
        <>
            {publicNotices.map((publicNotice, i)=>(
                <div key={i} className={classes.container}>
                    <a href={publicNotice?.url}>
                        <p>{publicNotice?.title}</p>
                    </a>
                    <p>{moment(publicNotice?.createdAt,'YYYYMMDD').format('YYYY-MM-DD')}</p>
                </div>
            ))}
            </>
    );
}

export default ApiNotice;


const styles = makeStyles({
    container: {
        display: 'flex',
        padding: 16,
        marginTop: 8,
        border: '1px solid #adadad',
        borderRadius: 2,
        flexDirection: 'column'
    }
});
