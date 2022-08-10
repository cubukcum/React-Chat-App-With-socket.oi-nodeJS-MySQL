import axios from "axios";

// axios.defaults.withCredentials  = true

const api = axios.create({

  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },



});

export default api;
