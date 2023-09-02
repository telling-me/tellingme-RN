import axios from 'axios';
import Config from 'react-native-config';
// import {getCookie} from 'utils/cookies';

export const API = axios.create({baseURL: Config.APP_API_URL});

// production
// export const API = axios.create({baseURL: 'https://tellingme.shop:8080'});

// development
// export const API = axios.create({baseURL: 'https://tellingme.store:8080'});

// API.interceptors.request.use(function (config) {
//   const token = getCookie('accessToken');

//   if (token !== null || token !== undefined) {
//     config.headers.accessToken = token;
//   }
//   return config;
// });

// API.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const errorDataStatus = error.response.status;
//     if (errorDataStatus === 403) {
//       location.href = '/app/403';
//     }
//     if (errorDataStatus === 500) {
//       location.href = '/app/500';
//     }
//     return await Promise.reject(error);
//   },
// );
