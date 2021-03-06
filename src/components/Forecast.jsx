import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeatherModal from '../components/WeatherModal.jsx';
import Temperature from './Temperature.jsx';
import { fadeIn, moveUp } from './Animations';

const ForecastIcon = styled.div`
    animation: 2s ${moveUp} ease-in both;
`;
const ForecastContainer = styled.div`
    width: 150px;
    margin: 5px;
    font-size: 0.8em;
    padding-top: 10px;
    border-radius: 5px;
    cursor: ${props => props.disable ? 'default' : 'pointer'};
    color: ${props => props.disable ? 'inherit' : "rgba(0,0,0,1)"};
    background: ${props => props.disable ? 'inherit' : "rgba(255,255,255,0)"};
    &:hover {
        box-shadow: ${props => props.disable ? 'none' : '1px 1px 4px 1px rgba(0,0,0,0.4)'};
        color: ${props => props.disable ? 'inherit' : "rgba(0,0,0,0.75)"};
        background: ${props => props.disable ? 'inherit' : "rgba(255,255,255,0.2)"};
    }
`;
export default function Forecast({ temperature, temperatureUnit, name, shortForecast, detailedForecast, isDaytime, primaryColor, disable }) {
    const [isOn, setIsOn] = useState(false);
    const [open, setOpen] = useState(false);
    function setIcon(weather, isDay) {
        const w = weather.toLowerCase();
        const isThuderStorm = w.includes('thunderstorm');
        const isShowers = w.includes('showers');
        const isTornado = w.includes('tornado');
        const isHail = w.includes('hail');
        const isSnowy = w.includes('snow');
        const isFog = w.includes('fog');
        switch (w) {
            case 'mostly sunny':
                return ['fad', 'sun-cloud']
            case 'sunny':
                return ['fas', 'sun']
            case 'partly cloudy':
                return !isDay ? ['fad', 'cloud-moon'] : ['fad', 'clouds']
            default:
                if (isThuderStorm) {
                    return !isDay ? ['fad', 'thunderstorm-moon'] : ['fad', 'thunderstorm-sun']
                }
                if (isShowers) {
                    return ['fad', 'cloud-showers']
                }
                if (isFog) {
                    return ['fad', 'fog']
                }
                if (isSnowy) {
                    return ['fad', 'cloud-snow']
                }
                if (isHail) {
                    return ['fad', 'cloud-hail']
                }
                if (isTornado) {
                    return ['fas', 'tornado']
                }
                return !isDay ? ['fad', 'clouds-moon'] : ['fad', 'cloud-sun']
        }
    }

    function handleClose() {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <WeatherModal
                open={open}
                handleClose={handleClose}
                primaryColor={primaryColor}
                name={name}
                primaryColor={primaryColor}
                description={detailedForecast}
                temperature={temperature}
                temperatureUnit={temperatureUnit} />
            <ForecastContainer
                onMouseEnter={() => { setIsOn(true) }}
                onMouseLeave={() => { setIsOn(false) }}
                onClick={() => { setOpen(true) }}
                color={primaryColor}
                disable={disable}>
                {shortForecast.toLowerCase().split('and').filter(each => each !== 'and').map(forecast =>
                    <ForecastIcon  key={forecast.trim()}>
                        <FontAwesomeIcon
                            size='4x'
                            icon={setIcon(forecast.trim(), isDaytime)} />
                    </ForecastIcon>
                )}
                <Temperature
                    small={true}
                    temperature={temperature}
                    unit={temperatureUnit} />
                <h3>{name}</h3>
                <p style={{ pading: '0px 5px' }}>{shortForecast}</p>
            </ForecastContainer>
        </React.Fragment>
    )
}