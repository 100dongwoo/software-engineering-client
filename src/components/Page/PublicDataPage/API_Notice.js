import React, { useEffect, useState } from 'react';
import api from '../../../api_manager';

function ApiNotice(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // props.auth.fetchProfile();
        fetch(
            'https://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&pageNo=1&numOfRows=100&pageSize=100&startPage=1&startDate=20141001&endDate=20201020'
            // {
            //     mode: 'no-cors',
            //     method: 'GET',
            //     headers: new Headers({
            //         Accept: 'application/xml',
            //         'content-type':
            //             'application/xml; charset=utf-8; application/x-www-form-urlencoded',
            //         'Access-Control-Allow-Origin': '*',
            //         'Access-Control-Allow-Methods': 'GET, POST, PUT',
            //         'Access-Control-Allow-Headers': 'Content-Type',
            //     }),
            // }
        )
            .then((res) => console.log('openApi res', res))

            .catch((error) => {
                console.log('openApi err', error);
            });
    }, []);

    return <div>asd</div>;
}

export default ApiNotice;
