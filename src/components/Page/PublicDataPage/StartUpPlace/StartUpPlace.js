import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api, { extraApi } from '../../../../api_manager';
import moment from 'moment';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import StartUpPlaceToopTip from './StartUpPlaceToopTip';
const top100Films = [
    { title: '전체' },
    { title: '부산' },
    { title: '서울' },
    { title: '경기' },
    { title: '제주' },
];
//http://apis.data.go.kr/B552735/workspaceErumService/getAreaCenterList?serviceKey=UO7tvHBrpODqQ%2BFLE4u3%2FRWyekRHkB5tnV%2B3OS2FaYJeT8xLTF2d5Qa7xH6y32xBp9BJR5eex%2FOPNb0s0zpfeg%3D%3D&area=%EB%B6%80%EC%82%B0

function StartUpPlace(props) {
    const [startUpPlaces, setStartUpPlaces] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    useEffect(() => {
        fetchStartUpPlaces('전체');
    }, []);

    const fetchStartUpPlaces = (region) => {
        if (
            region !== '부산' &&
            region !== '서울' &&
            region !== '경기' &&
            region !== '제주' &&
            region !== '전체'
        ) {
            return;
        }
        api.get('v1/startup-places/').then((res) => {
            if (!res.ok) {
                alert('공공데이터를 불러오는 데\n실패하였습니다.');
                return;
            }
            let data = res.data;

            if (region !== '전체') {
                data = data.filter((place) => place.region === region);
            }
            setStartUpPlaces(data);
        });
    };

    return (
        <>
            {console.log(startUpPlaces)}
            <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 200 }}
                onChange={(event, values) => {
                    if (values === null || values.title.length < 1) {
                        return;
                    }
                    fetchStartUpPlaces(values.title);
                    setSelectedRegion(values.title);
                }}
                renderInput={(params) => (
                    <TextField
                        style={{ marginTop: 30 }}
                        {...params}
                        label="지역"
                        variant="outlined"
                        // onChange={(e) => {
                        //     console.log(e.target.value);
                        //     fetchStartUpPlaces(e.target.value);
                        // }}
                    />
                )}
            />
            <Container>
                {startUpPlaces.map((place, i) => (
                    <StartUpPlaceToopTip place={place} />
                ))}
            </Container>
        </>
    );
}

export default StartUpPlace;

const Container = styled.div`
    max-width: 1640px;
    margin: 2rem auto auto;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1.2fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1.5rem;

    @media only screen and (max-width: 1024px) {
        grid-template-columns: repeat(2, 1.2fr);
        margin-top: 1rem;
    }
    @media only screen and (max-width: 524px) {
        grid-template-columns: repeat(1, 1.2fr);
        margin-top: 1rem;
    }
`;
