import { observable, computed } from 'mobx';

/**
 * Admin Store만 singleton으로 생성
 */
class AdminStore {
  static instance = null;

  constructor() {
    if (AdminStore.instance) return AdminStore.instance;
    AdminStore.instance = this;
  }

  @observable
  jwt = ''

  @computed
  get isAuthed() {
    return this.jwt.length > 0;
  }
}

export default AdminStore;
