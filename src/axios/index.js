import Axios from 'axios';
import AdminStore from '../stores/Admin/AdminStore';

const adminStore = AdminStore.instance;
/**
 * Axios 요청 기본 정보
 */
const axios = Axios.create({
  baseURL: 'http://133.186.143.160/api',
  headers: {
    Authorization: `Bearer ${adminStore.jwt}`
  }
});

export default axios;
