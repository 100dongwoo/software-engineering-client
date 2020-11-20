import React, { useEffect, useState } from 'react';
import api from '../../../api_manager';

function ApiNotice(props) {
    const [posts, setPosts] = useState([]);
    //http://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&numOfRows=10&startPage=1&pageSize=10&pageNo=1
    useEffect(() => {
        // props.auth.fetchProfile();
        fetch(
            'http://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&numOfRows=10&startPage=1&pageSize=10&pageNo=1'
        )
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    }, []);

    return <div>asd</div>;
}

export default ApiNotice;
