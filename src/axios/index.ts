import ax from 'axios';
// const baseURL = 'https://www.someapi.com/';
export const baseURL = 'http://localhost:3655/';

const axios = ax.create({ baseURL, timeout: 30000 });

export default axios;
