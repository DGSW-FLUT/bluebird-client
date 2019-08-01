import Axios from 'axios';
import { observe } from 'mobx';
import AdminStore from '../stores/Admin';
import config from '../config';
// get Instance
const adminStore = AdminStore.getInstance();

/**
 * Axios 요청 기본 정보
 */
const axios = Axios.create({
  baseURL: config.apiURL,
  headers: {
    Authorization: `Bearer ${adminStore.jwt}`
  },
});
// Add a response interceptor
axios.interceptors.response.use(response => response, (error) => {
  if (error.response.status === 401) {
    adminStore.setJwtToken('');
    localStorage.clear();
    // eslint-disable-next-line no-restricted-globals
    location.href = '/login';
  }
  return error;
});

observe(adminStore, (change) => {
  axios.defaults.headers.Authorization = `Bearer ${change.newValue}`;
});

export default axios;
