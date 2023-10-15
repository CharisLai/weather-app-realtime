import React, { useState, useEffect, useMemo } from 'react'
//  載入 emotion styled套件
import styled from '@emotion/styled'
// 載入 ThemeProvider
import { ThemeProvider } from '@emotion/react';

import { getMoment, findLocation } from './utils/helpers.js';
import WeatherCard from './views/WeatherCard.js';
import useWeatherAPI from './hooks/useWeatherAPI.js';

import WeatherSetting from './views/WeatherSetting.js';

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

const App = () => {

  // 從localStorage 取出先前保存的地區，若沒有保存過就給予預設值
  const storageCity = localStorage.getItem('cityName') || '高雄市';
  const [currentPage, setCurrentPage] = useState('WeatherCard')
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [currentCity, setCurrentCity] = useState(storageCity);

  // 透過props傳遞函式 從父元件將修改資料方法來 傳遞到子元件：轉換設定頁面
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  }

  const currentLocation = useMemo(() => findLocation(currentCity),
    [currentCity]);

  const { cityName, locationName, sunriseCityName } = currentLocation;

  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  const [weatherElement, fetchData] = useWeatherAPI({
    locationName,
    cityName,
    authorizationKey: AUTHORIZATION_KEY,
  });
  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            cityName={cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            handleCurrentCityChange={handleCurrentCityChange}
            handleCurrentPageChange={handleCurrentPageChange}
          />
        )}
        {currentPage === 'WeatherSetting' && (
          <WeatherSetting cityName={cityName}
            handleCurrentPageChange={handleCurrentPageChange}
            handleCurrentCityChange={handleCurrentCityChange} />)}
      </Container>
    </ThemeProvider>
  );
};
export default App;