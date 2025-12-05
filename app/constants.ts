const DEV = "development";
const PROD = "production";
const ENV = import.meta.env.VITE_ENV || DEV;
const URL_API = ENV === PROD ? import.meta.env.VITE_API_BKD_URL : "http://localhost:9992/api";

export {
    URL_API
}