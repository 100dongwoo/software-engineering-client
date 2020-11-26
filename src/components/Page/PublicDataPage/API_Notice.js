import React, { useEffect, useState } from 'react';
import api, { extraApi } from '../../../api_manager';
import axios from 'axios';
const apiKey = 'UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D';
const url = 'http://openapi.kised.or.kr/openapi/service/rest/ContentsService/getNoticeList';
let DOMParser = require('xmldom').DOMParser;


function ApiNotice(props) {
    const [posts, setPosts] = useState([]);
    const [numOfRows, setNumOfRows] = useState(5); //페이지당 게시물 목록 수
    const [startPage, setStartPage] = useState(1); //시작페이지 번호
    const [pageSize, setPageSize] = useState(10); //페이지당 게시물 목록 건수
    const [pageNumber, setPageNumber] = useState(1); //페이지번호
    //http://openapi.kised.or.kr/openapi/service/rest/StartupInfoSvc/ContentsService/getNoticeList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&numOfRows=5&startPage=1&pageSize=10&pageNo=1

    useEffect(() => {
        // props.auth.fetchProfile();
    axios.get(
            `${url}?serviceKey=${apiKey}&numOfRows=${numOfRows}&startPage=${startPage}&pageSize=${pageSize}&pageNo=${pageNumber}`
        ,{headers : {'Access-Control-Allow-Origin' : '*'}})
            .then((res) => res.text())
            .then((data) => {
                console.log('aa')
                let xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                let x = xmlDoc.getElementsByTagName("items");
                console.log(x)
                // console.log(data)
            })
            .catch((err) => console.log(err));
    }, []);



    return <div>asdf</div>;
}

export default ApiNotice;
