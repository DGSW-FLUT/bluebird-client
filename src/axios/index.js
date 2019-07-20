import Axios from 'axios';
import { observe } from 'mobx';
import AdminStore from '../stores/Admin/AdminStore';
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
  }
});

observe(adminStore, (change) => {
  axios.defaults.headers.Authorization = `Bearer ${change.newValue}`;
});

export default axios;
