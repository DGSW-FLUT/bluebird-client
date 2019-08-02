import { observable, computed, action } from 'mobx';

/**
 * Admin Store만 singleton으로 생성
 */
class AdminStore {
  static instance = null;

  static getInstance() {
    if (AdminStore.instance === null) AdminStore.instance = new AdminStore();
    return AdminStore.instance;
  }

  constructor() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.jwt = jwt;
    }
  }

  @observable
  jwt = '';

  @computed
  get isAuthed() {
    return this.jwt.length > 0;
  }

  @action.bound
  setJwtToken(jwt) {
    this.jwt = jwt;
    localStorage.setItem('jwt', jwt);
  }
}

export default AdminStore;
