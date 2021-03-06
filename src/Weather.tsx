import "./Weather.css";
import React, { useEffect } from "react";
import { Typography, Row, Col } from "antd";

interface WeatherData {
  icon: string;
  main: string;
  description: string;
}

interface WeatherDataSectionProps {
  weatherData: WeatherData;
}

const WeatherDataSection: React.FunctionComponent<WeatherDataSectionProps> = (
  props
) => {
  const { weatherData } = props;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div>
      <Row>
        <Col span={12}>
        <img src={iconUrl} className="Weather-logo" alt="logo" />
        </Col>
      
        <Col span={12}>
        <Typography.Title level={2}>{weatherData.main}</Typography.Title>
        <Typography.Text>{weatherData.description}</Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

type DayEntry = any;
const getTemperatureForDay = (day: DayEntry) => {
  return day.temp.day;
};

const getWeatherForecast = async (city: string): Promise<DayEntry[]> => {
  const getLatLong = () => {
    switch (city) {
      case "Helsinki":
        return { lat: 60.19, lon: 24.94 };
      case "Tampere":
        return { lat: 61.5, lon: 23.79 };
      case "Turku":
        return { lat: 60.45, lon: 22.27 };
      case "Oulu":
        return { lat: 65.01, lon: 25.47 };
      default:
        throw new Error("Unknown city");
    }
  };
  const { lat, lon } = getLatLong();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = await response.json();
  const dailyForecast = data.daily;
  console.log(dailyForecast);
  return dailyForecast;
};

const getWeatherFromApi = async (): Promise<WeatherData> => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = await response.json();
  const weather = data.weather[0]; 
  return weather;
};

const Weather: React.FunctionComponent = () => {

  const [weatherData, setWeatherData] = React.useState<WeatherData | undefined>(undefined);
  
  useEffect(() => {
    async function fetchData() {
      const response = await getWeatherFromApi();
      setWeatherData(response)
      // ...
    }
    fetchData();
  }, []); 


  if (!weatherData) {
    return <p>No data</p>;
  }
  return (
    <div>
    <Typography.Title>Current Weather</Typography.Title>
    <WeatherDataSection weatherData={weatherData} />
    </div>
  );
};

export default Weather;
