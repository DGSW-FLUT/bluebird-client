import { observable, action, flow } from 'mobx';

import axios from '../../axios';

class ManagerStore {
  async changePw(password) {
    try {
      await axios.patch('/auth', { password }).then(res => true);
    } catch (err) {
      return false;
    }
  }

  @action
  add = flow(function* (data) {
    const response = yield axios.post('/auth', data);
    if (response.status === 200) {
      const result = response.data;
      this.adminList = this.adminList.concat(result);
      return true;
    }
    return false;
  });

  @observable
  adminList = [];

  fetchAdminList = flow(function* () {
    const response = yield axios.get('/auth');
    if (response.status === 200) {
      const { data } = response;
      this.adminList = data;
    }
  });

  @action
  removeAdmin = flow(function* (data) {
    const response = yield axios.delete(`/auth/${data.id}`);
    if (response.status === 204) {
      this.adminList = this.adminList.filter(el => data !== el);
      return true;
    }
    return false;
  });
}

export default ManagerStore;
