import { handleErrors, _checkStatus } from "../errorhandling";
import axios from "axios";
export const ERROR_NO_CONNECTION = [
    "Sorry there is problem. Pleas refresh again.",
];
export const RESPONSE_SUCCESS = "SUCCESS";
export const RESPONSE_ERROR = "ERROR";
const base_url = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = base_url;
function filtered(obj) {
    for (var propName in obj) {
        if (obj[propName] === null ||
            obj[propName] === undefined ||
            obj[propName] === "") {
            delete obj[propName];
        }
    }
    return obj;
}
export const fetchAPI = (type, url, params) => {
    let config;
    let set = { method: type, url };
    switch (type) {
        case "GET":
            config = Object.assign(Object.assign({}, set), { params: filtered(params) });
            break;
        default:
            config = Object.assign(Object.assign({}, set), { data: params });
            break;
    }
    const ft = axios(config)
        .then(_checkStatus)
        .catch((error) => {
        if (axios.isCancel(error)) {
            console.log("Request cancelled by user");
        }
        else {
            handleErrors(error);
        }
    });
    return ft;
};
