import { useState, useEffect } from "react";

const Weather = () => {
    // temp: 기온 (초기값 null - 도착 전엔 값 없음) 
    // isLoading : 로딩 상태 확인하여 가져오기
    const [temp, setTemp] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5&longitude=127&current_weather=true').then((res) => res.json()).then((data) => {setTemp(data.current_weather.temperature); setIsLoading(false)}).catch((error) => {
            console.error('기온 로딩 실패:', error); setIsLoading(false)})
    }, [])

    return (
    <p> 🌡️ 서울 기온 : {isLoading ? '불러오는 중...' : (temp ? temp + 'ºC' : '불러올 수 없습니다.')}</p> 
)
}

export default Weather