import { observable, computed, action } from 'mobx';

/**
 * Admin Store만 singleton으로 생성
 */
class AdminStore {
  static instance = null;

  constructor() {
    if (AdminStore.instance) return AdminStore.instance;
    AdminStore.instance = this;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.jwt = jwt;
    } else { // Debug Only
      this.setJwtToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjIsImlhdCI6MTU2MzYxMTgyMSwiZXhwIjoxNTY4Nzk1ODIxfQ.YswkBeWysD74s5DPbft9XvdSqmzmF2mopoL4UdLtL10');
    }
  }

  @observable
  jwt = null;

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
