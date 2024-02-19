import styled from "styled-components";

export const MainWrapper = styled.div`
    height: 100vh;
    font-family: Monaco, monospace;
    background: linear-gradient(to bottom, rgba(29, 23, 118, 0.8), rgba(166, 47, 204, 0.8));

    .container {
        background-color: rgba(223, 206, 231, 0.25);
        border-radius: 20px;
        padding: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 15px 15px rgb(0 0 0 / 10%);
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.8);
        background-blend-mode: overlay;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        position: absolute;

    .searchContainer {
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    .searchContainer > input {
        outline: none;
        border: none;
        border: 1px solid rgba(232, 220, 238, 0.8);
        padding: 8px;
        border-radius: 25px;
        text-align: center;
        width: 80%;
        background: transparent;
        }
        
    .searchContainer > input::placeholder {
        color: rgba(232, 220, 238, 0.8);
    }

    .searchContainer > input {
        color: rgba(223, 198, 101, 0.8);
    }
    
    .searchIconContainer {
        width: 30px; 
        height: 30px; 
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .searchIcon {
        color: rgba(232, 220, 238, 0.8);
    }

    .searchIcon:hover {
        color: rgba(223, 198, 101, 0.8);
    }

    .weatherContainer {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 30px 0;
    }

    .weatherContainer > h1 {
        font-size: 30px;
        letter-spacing: 3px;
        color: rgba(223, 198, 101, 0.8);
        font-weight: 200;
    }

    .weatherContainer > span {
        font-size: 15px;
        letter-spacing: 1px;
        color: rgba(232, 220, 238, 0.8);
        font-weight: 200;
    }

    h1, p, h2, .windIcon, .humidityIcon {
        color: rgba(232, 220, 238, 0.8);
        font-weight: 200;
    }

    h1, p, h2 {
        font-size: 20px;
    }

    .humidityIcon, .windIcon {
        font-size: 3rem;
    }

    .detailsContainer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 25px;
        border-radius: 12px;
        padding: 10px;

        @media (max-width: 768px) {
            flex-direction: column;
            text-align: center;

            .humidity, .wind {
                margin-bottom: 10px;
            }
        }
    }

    .humidityPercentage, .windPercentage {
        margin: 20px; 
    }


`