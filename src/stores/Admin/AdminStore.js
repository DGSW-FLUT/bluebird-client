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

  /**
   * test jwt 토큰 값 (나중에 무조건 지울 것!)
   */
  @observable
  jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjIsImlhdCI6MTU2MzYxMTgyMSwiZXhwIjoxNTY4Nzk1ODIxfQ.YswkBeWysD74s5DPbft9XvdSqmzmF2mopoL4UdLtL10'

  @computed
  get isAuthed() {
    return this.jwt.length > 0;
  }
}

export default AdminStore;
