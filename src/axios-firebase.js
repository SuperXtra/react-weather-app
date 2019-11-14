import axios from "axios";
import * as config from './configParameters';

const instance = axios.create({
    baseURL: config.BACKEND_BASE_URL
});
export default instance;