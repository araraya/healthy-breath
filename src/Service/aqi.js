import axios from "axios";
async function GetAQI() {
    const apiKey = process.env.REACT_APP_AQI_API_KEY;
    axios
        .get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=-6.2160896&lon=106.9613056&appid=` +
            `${apiKey}`
        )
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

export default GetAQI;
