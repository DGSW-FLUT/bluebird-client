import { observable, action, computed } from 'mobx';

/**
 * 회원 스토어
 */
class MemberStore {
  @observable
  memberList = [];

  @action.bound
  setMemberList(memberList) {
    this.memberList = memberList;
  }

  @computed
  memberCount() {
    return this.memberList.length;
  }
}

export default MemberStore;
