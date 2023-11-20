import axios from "axios";
async function GetAQI(features) {
    const apiKey = process.env.REACT_APP_AQI_API_KEY;



    for await (const feature of features) {
        const coordinates = feature.geometry.coordinates
        try {
            const res = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=` + coordinates[0] + `&lon=` + coordinates[1] + `&appid=` +
                `${apiKey}`);
            console.log(res);
            feature.properties['aqi'] = res.data.list[0].main.aqi ?? 5;
        } catch (error) {
            feature.properties['aqi'] = 5;
            console.error(error);
        }
    }
    console.log(features);
    return features;
}

export default GetAQI;
