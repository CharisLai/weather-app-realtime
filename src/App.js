import React, { useState, useEffect, useMemo } from 'react'
//  載入 emotion styled套件
import styled from '@emotion/styled'
// 載入 ThemeProvider
import { ThemeProvider } from '@emotion/react';

import { getMoment } from './utils/helpers';
import WeatherCard from './views/WeatherCard';
import useWeatherAPI from './hooks/useWeatherAPI';
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
const Container = styled.div`
	background-color: ${({ theme }) => theme.backgroundColor};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

// 中央氣象
const AUTHORIZATION_KEY = 'CWB-4ADAF3DC-97E6-41E6-853F-469F6B27FF31';

// 預設地點
const LOCATION_NAME = '高雄';
const LOCATION_NAME_FORECAST = '高雄市';

const App = () => {
  const [weatherElement, fetchData] = useWeatherAPI({
    locationName: LOCATION_NAME,
    cityName: LOCATION_NAME_FORECAST,
    authorizationKey: AUTHORIZATION_KEY,
  });
  const [currentTheme, setCurrentTheme] = useState('dark');
  const moment = useMemo(() => getMoment(LOCATION_NAME_FORECAST), []);

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard weatherElement={weatherElement} moment={moment} fetchData={fetchData} />
      </Container>
    </ThemeProvider>
  );
};
export default App;