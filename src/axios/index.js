import Axios from 'axios';
import { observe } from 'mobx';
import AdminStore from '../stores/Admin/AdminStore';

// get Instance
const adminStore = new AdminStore();

/**
 * Axios 요청 기본 정보
 */
const axios = Axios.create({
  baseURL: 'http://133.186.143.160/api',
  headers: {
    Authorization: `Bearer ${adminStore.jwt}`
  }
});

observe(adminStore.jwt, (change) => {
  console.log('change');
  axios.defaults.headers.Authorization = `Bearer ${change.newValue}`;
});

export default axios;
