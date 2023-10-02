import React, { useState } from 'react'
//  載入 emotion styled套件
import styled from '@emotion/styled'
// 載入 ThemeProvider
import { ThemeProvider } from '@emotion/react';
import dayjs from 'dayjs';
// 載入SVG 用as 修改名稱
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg';
import { ReactComponent as RainIcon } from './images/rain.svg';
import { ReactComponent as RefreshIcon } from './images/refresh.svg';

// 中央氣象
const AUTHORIZATION_KEY = 'CWB-4ADAF3DC-97E6-41E6-853F-469F6B27FF31';

// 預設地點
const LOCATION_NAME_FORECAST = '高雄';

// 定義主題配色
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

//  定義帶有styled 的元件
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color:  ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const Container = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`;

const Description = styled.div`
  font-size: 16px;
  color:  ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const Location = styled.div`
  font-size: 28px;
  color:  ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color:  ${({ theme }) => theme.textColor};;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  color:  ${({ theme }) => theme.textColor};
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

const Temperature = styled.div`
  color:  ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const WeatherCard = styled.div`
	position: relative;
	min-width: 360px;
	box-shadow: ${({ theme }) => theme.backgroundColor};
	background-color: ${({ theme }) => theme.foregroundColor};
	box-sizing: border-box;
	padding: 30px 15px;
`;

// 把上定義好的 styled-component 當成元件使用
const App = () => {

  const [currentTheme, setCurrentTheme] = useState('dark');
  const [currentWeather, setCurrentWeather] = useState({
    // observationTime: '2020-12-12 22:10:00',
    locationName: '高雄市',
    description: '多雲時晴',
    windSpeed: 3.6,
    temperature: 32.1,
    rainPossibility: 60,
  })

  // handleClick
  const handleClick = () => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data)
        const locationData = data.records.location[0];

        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (['WDSD', 'TEMP'].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          }, {}
        )
        setCurrentWeather({
          ...currentWeather,
          temperature: weatherElements.TEMP,

        })
        console.log(currentWeather)
      });
  }


  return (
    <ThemeProvider theme={theme[currentTheme]} >
      <Container >
        <WeatherCard>
          <Location>{currentWeather.locationName}</Location>
          <Description>{currentWeather.description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(currentWeather.temperature)}
              <Celsius>°C</Celsius>
            </Temperature>
            <DayCloudy />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {currentWeather.windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {currentWeather.rainPossibility} %
          </Rain>
          <Refresh onClick={handleClick} >
            最後觀測時間：
            {new Intl.DateTimeFormat('zh-TW', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(dayjs(currentWeather.observationTime))}{''}
            <RefreshIcon />
          </Refresh>
        </WeatherCard>
      </Container >
    </ThemeProvider >
  );
};

export default App
