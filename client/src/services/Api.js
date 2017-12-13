import axios from 'axios';

const isDev   = process.env.NODE_ENV === 'development';
const devUrl  = 'http://localhost:8081';
const prodUrl = 'https://co-ment-admin-dash.glitch.me/';
const APIurl  = isDev ? devUrl : prodUrl;

export default () => {
  return axios.create({
    baseURL: APIurl
  });
};
