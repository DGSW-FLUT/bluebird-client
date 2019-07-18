import { observable, computed } from 'mobx';

/**
 * Admin Store만 singleton으로 생성
 */
class AdminStore {
  static instance = null;

  constructor() {
    if (this.instance) return this.instance;
    this.instance = this;
  }

  @observable
  jwt = ''

  @computed
  isAuthed() {
    return this.jwt.length > 0;
  }
}

export default AdminStore;
