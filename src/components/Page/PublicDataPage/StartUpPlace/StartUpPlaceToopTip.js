import React, { useState } from 'react';
import ToolTip from 'react-portal-tooltip';
import RoomIcon from '@material-ui/icons/Room';
import styled from 'styled-components';

function StartUpPlaceToopTip({ place }) {
    const [posisition, setPosition] = useState('');
    const [posisition1, setPosition1] = useState('');
    const [isTooltipActive, setIsTooltipActive] = useState(false);
    const [isTooltipActive1, setIsTooltipActive1] = useState(false);
    const showTooltip = () => {
        setIsTooltipActive(true);
    };
    const hideTooltip = () => {
        setIsTooltipActive(false);
    };
    const showTooltip1 = () => {
        setIsTooltipActive1(true);
    };
    const hideTooltip1 = () => {
        setIsTooltipActive1(false);
    };
    const openMap = () => {
        window.open(
            `https://map.kakao.com/link/search/${place.address}`

            // `https://map.kakao.com/link/map/${place.name},${place.latitude},${place.longitude}`
        );
    };

    return (
        // address: "부산 동구 중앙대로296번길 3-3 (초량동)"
        // enterprise: "여성기업종합지원센터"
        // id: 397
        // latitude: 35.123116
        // longitude: 129.04457
        // name: "(재)여성기업종합지원센터 부산센터"
        // region: "부산"
        // tel: "051-465-1001"
        <>
            <TooltipContainer
                ref={(element) => {
                    setPosition(element);
                }}
            >
                <p onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
                    {place.name}
                </p>
                <ToolTip
                    active={isTooltipActive}
                    parent={posisition}
                    position="right"
                    arrow="center"
                >
                    <div>
                        <p>{place.enterprise}</p>

                        <p>{place.tel}</p>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/*<p>{place.region}</p>*/}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                }}
                            >
                                <p
                                    style={{
                                        cursor: 'pointer',
                                        marginRight: 4,
                                    }}
                                    onClick={openMap}
                                >
                                    카카오지도보기
                                </p>
                                <RoomIcon
                                    style={{
                                        color: 'red',
                                        cursor: 'pointer',
                                    }}
                                    onClick={openMap}
                                />
                            </div>
                        </div>
                    </div>
                </ToolTip>
            </TooltipContainer>
            <AnotherTooltipContainer
                ref={(element) => {
                    setPosition1(element);
                }}
            >
                <p onMouseEnter={showTooltip1} onMouseLeave={hideTooltip1}>
                    {place.name}
                </p>
                <ToolTip
                    active={isTooltipActive1}
                    parent={posisition1}
                    position="bottom"
                    arrow="center"
                >
                    <div>
                        <p>{place.enterprise}</p>

                        <p>{place.tel}</p>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/*<p>{place.region}</p>*/}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                }}
                            >
                                <p
                                    style={{
                                        cursor: 'pointer',
                                        marginRight: 4,
                                    }}
                                    onClick={openMap}
                                >
                                    카카오지도보기
                                </p>
                                <RoomIcon
                                    style={{
                                        color: 'red',
                                        cursor: 'pointer',
                                    }}
                                    onClick={openMap}
                                />
                            </div>
                        </div>
                    </div>
                </ToolTip>
            </AnotherTooltipContainer>
        </>
    );
}

export default StartUpPlaceToopTip;

const TooltipContainer = styled.div`
    width: 280px;
    border: 1px solid #000;
    text-align: center;
    color: #34558b;
    display: block;
    font-weight: bold;
    @media only screen and (max-width: 1024px) {
        display: none;
    }
`;
const AnotherTooltipContainer = styled.div`
    width: 280px;
    border: 1px solid #000;
    text-align: center;
    color: #34558b;
    font-weight: bold;
    display: none;
    @media only screen and (max-width: 1024px) {
        display: inline-block;
    }
`;
