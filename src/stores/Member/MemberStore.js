import { observable, action, computed } from 'mobx';

/**
 * 회원 스토어
 */
class MemberStore {
  @observable
  memberList = [];

  @action.bound
  addMember(member) {
    this.memberList = this.memberList.concat(member);
  }

  @action.bound
  setMemberList(memberList) {
    this.memberList = memberList;
  }

  @computed
  get memberCount() {
    return this.memberList.length;
  }

  @computed
  get regularMemberCount() {
    return this.memberList.filter(m => m.level === '정회원').length;
  }
}

export default MemberStore;
