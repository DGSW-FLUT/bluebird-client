import { observable, action, computed } from 'mobx';

/**
 * 회원 스토어
 */
class MemberStore {
  @observable
  memberList = [
    {
      id: 1,
      name: 'Hello',
      birth: '2001년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    },
    {
      id: 2,
      name: 'Hello',
      birth: '2001년 03월 22일',
      addr: '서울특별시 강남구 역삼동',
      level: '정회원',
      phoneNumber: '010-9173-7607'
    }
  ];

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
