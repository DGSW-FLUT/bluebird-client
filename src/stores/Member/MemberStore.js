import { observable, action, computed } from 'mobx';
import axios from '../../axios';

/**
 * 회원 스토어
 */
class MemberStore {
  @observable
  memberList = [];

  @observable
  isFetched = false;

  @action.bound
  addMember(member) {
    this.memberList = this.memberList.concat(member);
  }

  @action.bound
  async fetchMemberList() {
    const response = await axios.get('/users');
    if (response.status === 200) {
      const { data } = response;
      this.memberList = data;
      this.isFetched = true;
    }
  }

  @action.bound
  async removeMember(id) {
    const response = await axios.delete(`/users/${id}`);
    if (response.status === 204) {
      const find = this.memberList.findIndex(v => v.idx === id);
      this.memberList = this.memberList.splice(find, 1);
      return true;
    }
    return false;
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
