import {
  observable, computed, action, flow
} from 'mobx';

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
    try {
      const response = yield axios.post('/auth', data);
      if (response.status === 200) {
        const result = response.data;
        this.adminList = this.adminList.concat(result);
        return true;
      }
    } catch (err) {
      return false;
    }
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

  removeAdmin = flow(function* (id) {
    const response = yield axios.delete(`/auth/${id}`);
    console.log(response);
  });
}

export default ManagerStore;
