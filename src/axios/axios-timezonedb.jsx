import axios from "axios";
import * as config from '../configParameters';

const instance = axios.create({
    baseURL: config.TIMEZONEDB_BASIC_URL
});
export default instance;