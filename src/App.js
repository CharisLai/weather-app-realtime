import React from 'react'
// Step 1 載入 emotion styled套件
import styled from '@emotion/styled'


// Step 2 定義帶有styled 的元件
const Container = styled.div`
	background-color: #ededed;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const WeatherCard = styled.div`
	position: relative;
	min-width: 360px;
	box-shadow: 0 1px 3px 0 #999999;
	background-color: #f9f9f9;
	box-sizing: border-box;
	padding: 30px 15px;
`;

// Step 3 把上定義好的 styled-component 當成元件使用
const App = () => {
  return (
    <Container>
      <WeatherCard>
        <h1>Weather</h1>
      </WeatherCard>
    </Container>
  )
}

export default App