import ax from 'axios';
const baseURL = 'https://www.someapi.com/';

const axios = ax.create({ baseURL, timeout: 30000, });

export default axios