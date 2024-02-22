import React, { useCallback, useEffect, useState } from "react";
import { MainWrapper } from "./weather";
import { BsSearch } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";
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

    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [searchCity, setSearchCity] = useState("");

    //fetch weather data for current location
    const fetchWeather = useCallback(async (lat:number, lon:number) => {
        const url = `${API_ENDPOINT}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    }, [API_ENDPOINT, API_KEY]);


    //fetch weather data for a specified city
    const fetchWeatherData = async (city:string) => {
        try{
            const url = `${API_ENDPOINT}weather?q=${city}&appid=${API_KEY}&units=metric`;
            const searchResponse = await axios.get(url);
            const currentSearchResponse:WeatherDataType = searchResponse.data;

            return{currentSearchResponse};
        } catch (error){
            console.error("No data found");
            throw error;
        }
    }

    //search city
    const handleSearch = async () => {
        if(searchCity.trim() === ""){
            return;
        }
        try{
            const {currentSearchResponse} = await fetchWeatherData(searchCity);
            setWeatherData(currentSearchResponse);
        } catch (error){
            console.error("No results found");
        }
    }

    //search upon pressing enter
    const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    //find user's location, and fetch current location's weather
    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                const [currentWeather] = await Promise.all([fetchWeather(latitude, longitude)]);
                    
                setWeatherData(currentWeather);
                setIsLoading(true);
            });
        };
        fetchData();
    }, [fetchWeatherData]);

    //change icon based on weather
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
                <input type="text" placeholder="Enter a city"
                 value={searchCity} 
                 onChange={(e) => setSearchCity(e.target.value)}
                 onKeyDown={handleEnterKey}
                 />
                <div className="searchIconContainer">
                    <BsSearch className="searchIcon"
                     onClick={handleSearch}
                    />
                </div>
            </div>

            {weatherData && isLoading ? (
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
                                <h1>{Math.round(weatherData.wind.speed)}km/h</h1>
                                <p>Wind speed</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="loading">
                    <FiLoader className="loadingIcon"/>
                    <p>Loading</p>
                </div>
            )} 
        </div>
    </MainWrapper> 
    );
};

export default DisplayWeather;