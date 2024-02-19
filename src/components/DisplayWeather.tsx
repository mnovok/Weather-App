import React, { useEffect } from "react";
import { MainWrapper } from "./styles.module";
import { BsSearch } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import axios from "axios";


const DisplayWeather = () => {

    const API_KEY = "289a178b4a360cf984d72f2a93e11093";
    const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/";

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
                    console.log(currentWeather);
                }
            ) 
        })
    })

    return(
    <MainWrapper>
        <div className="container">
            <div className="searchContainer">
                <input type="text" placeholder="Enter a city" />
                <div className="searchIconContainer">
                    <BsSearch className="searchIcon"/>
                </div>
            </div>
            <div className="weatherContainer">
                <h1>Split</h1>
                <span>Croatia</span>
                <div className="weatherIconContainer">
                    <div className="weatherIcon">

                    </div>
                    <h1>20°C</h1>
                    <h2>Sunny</h2>
                </div>
            </div>
            <div className="detailsContainer">
                <div className="humidity">
                    <WiHumidity className="humidityIcon"/>
                    <div className="humidityPercentage">
                        <h1>50%</h1>
                        <p>Humidity</p>
                    </div>
                </div>

                <div className="wind">
                    <FiWind className="windIcon"/>
                    <div className="windPercentage">
                        <h1>23 km/h</h1>
                        <p>Wind speed</p>
                    </div>
                </div>
            </div>
        </div>
    </MainWrapper> 
    )
}

export default DisplayWeather;