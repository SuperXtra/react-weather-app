import axios from "axios";

const instance = axios.create({
    baseURL: 'https://weather-app-sx.firebaseio.com/'
});
export default instance;