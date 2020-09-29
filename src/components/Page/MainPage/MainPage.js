import React, { useEffect, useState } from 'react';
import { withAuthContext } from '../../../context/AuthContext';

function MainPage(props) {
    const [user, setUser] = useState({});

    useEffect(()=>{
        props.auth.fetchProfile().then(res=>{
            if(!res){alert('데이터를 불러오는 데 실패하였습니다.'); return}
            setUser(res);
        })
        // props.auth.user = user = (res = userObject)
    },[]);

    return (
        <div>

            <h1>다윤이 꽃미녀</h1>
            <h2>{`${user.nickname} 존멋`}</h2>
        </div>
    );
}

export default withAuthContext(MainPage);
