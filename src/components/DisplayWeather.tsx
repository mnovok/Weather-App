import React, { useEffect, useState } from "react";
import { MainWrapper } from "./weather";
import { BsSearch } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import axios from "axios";
import Rainy from "../images/rain.png";
import Sunny from "../images/day_clear.png";
import Cloudy from "../images/cloudy.png";
import PartlyCloudy from "../images/day_partial_cloud.png";
import Mist from "../images/mist.png";

interface WeatherDataType {
    name: string;
    main: {
        temp: number,
        humidity: number,
    },
    sys: {
        country: string;
    },
    weather: {
        main: string;
    }[];
    wind: {
        speed: number;
    };
}

const DisplayWeather = () => {

    const API_KEY = "289a178b4a360cf984d72f2a93e11093";
    const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/";

    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

    const fetchWeather = async (lat:number, lon:number) => {
        const url = `${API_ENDPOINT}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        console.log(url);
        const response = await  axios.get(url);

        return response.data;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;

            Promise.all([fetchWeather(latitude, longitude)]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather);
                }
            ) 
        })
    })

    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode;
    
        switch (weather) {
            case "Rain":
                iconElement = <img src={Rainy} alt="Rainy" style={{ height: '100px', width: '100px' }} />;
                break;
    
            case "Clear":
                iconElement = <img src={Sunny} alt="Sunny" style={{ height: '100px', width: '100px' }} />;
                break;
    
            case "Clouds":
                iconElement = <img src={Cloudy} alt="Cloudy" style={{ height: '100px', width: '100px' }} />;
                break;
    
            case "Mist":
                iconElement = <img src={Mist} alt="Mist" style={{ height: '100px', width: '100px' }} />;
                break;
    
            default:
                iconElement = <img src={PartlyCloudy} alt="Partly Cloudy" style={{ height: '100px', width: '100px' }} />;
                break;
        }
    
        return <span className="weatherIcon">{iconElement}</span>;
    };
    

    return(
    <MainWrapper>
        <div className="container">
            <div className="searchContainer">
                <input type="text" placeholder="Enter a city" />
                <div className="searchIconContainer">
                    <BsSearch className="searchIcon"/>
                </div>
            </div>

            {weatherData && (
                <>
                    <div className="weatherContainer">
                        <h1>{weatherData.name}</h1>
                        <span>{weatherData.sys.country}</span>
                        <div className="weatherIconContainer">
                            <div className="weatherIcon">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <h1>{Math.round(weatherData.main.temp)}°C</h1>
                            <h2>{weatherData.weather[0].main}</h2>
                        </div>
                    </div>
                    <div className="detailsContainer">
                        <div className="humidity">
                            <WiHumidity className="humidityIcon"/>
                            <div className="humidityPercentage">
                                <h1>{weatherData.main.humidity}%</h1>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className="wind">
                            <FiWind className="windIcon"/>
                            <div className="windPercentage">
                                <h1>{weatherData.wind.speed}km/h</h1>
                                <p>Wind speed</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    </MainWrapper> 
    )
}

export default DisplayWeather;