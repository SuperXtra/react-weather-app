import axios from "axios";
import * as config from '../configParameters';

const instance = axios.create({
    baseURL: config.WEATHER_API_BASE_URL
});
export default instance;