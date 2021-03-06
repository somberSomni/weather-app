import React from 'react';
import Forecast from './Forecast.jsx';
import Temperature from './Temperature.jsx';
import WeatherStats from './WeatherStats.jsx';
import styled from 'styled-components';
import { Description } from './Containers.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { moveUp } from './Animations';

const ForecastIcon = styled.div`
    animation: 2s ${moveUp} ease-in both;
`;

const TempContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    background: ${props => props.color || '#00ACF9'}
`;

const ReportContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    max-width: 90vw;
    background: #222;
`;

const WeatherFeature = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    background: #DDD;
    width: 100%;
`;

export default function MainReport({ city, state, currentReport, detailedForecast, weatherStats, primaryColor }) {
    const {
        temperature,
        temperatureUnit,
        windSpeed,
        windDirection } = currentReport;
    const {
        elevation,
        heatIndex,
        relativeHumidity
    } = weatherStats;

    return (
        <ReportContainer>
            <TempContainer color={primaryColor}>
                <Temperature
                    temperature={temperature}
                    unit={temperatureUnit}
                    small={false} />
                <ForecastIcon>
                    <FontAwesomeIcon
                        size='2x'
                        icon={['fas', 'map-marker-check']} />
                </ForecastIcon>
                <h4 style={{ width: '50%', textAlign: 'center' }}>{city}, {state}</h4>
            </TempContainer>
            <WeatherFeature>
                <div>
                    <div style={{ float: 'left' }}>
                        <Forecast {...currentReport} primaryColor={primaryColor} disable={true} />
                    </div>
                    <Description
                        color={primaryColor}>{currentReport.detailedForecast.length > 0 ? currentReport.detailedForecast : (detailedForecast || "No description was found")}</Description>
                </div>
                <WeatherStats
                    humidity={relativeHumidity}
                    heatIndex={heatIndex}
                    windDir={windDirection}
                    wind={windSpeed}
                    elevation={elevation} />
            </WeatherFeature>
        </ReportContainer>
    )
}