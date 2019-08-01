import {
  observable, computed, flow
} from 'mobx';
import axios from '../../axios';

/**
 * 회원 스토어
 */
class MemberStore {
  @observable
  memberList = [];

  @observable
  isFetched = false;

  addMember = flow(function* (member) {
    const response = yield axios.post('/users', member);
    if (response.status === 201) {
      this.memberList = this.memberList.concat(response.data);
      return true;
    }
    return false;
  });

  fetchMemberList = flow(function* () {
    const response = yield axios.get('/users');
    if (response.status === 200) {
      const { data } = response;
      this.memberList = data;
      this.isFetched = true;
    }
  });

  removeMember = flow(function* (id) {
    const response = yield axios.delete(`/users/${id}`);
    if (response.status === 204) {
      const find = this.memberList.findIndex(v => v.id === id);
      this.memberList.splice(find, 1);
      this.memberList = this.memberList;
      return true;
    }
    return false;
  });

  updateMember = flow(function* (user) {
    const response = yield axios.patch(`/users/${user.id}`, user);
    if (response.status === 200) {
      const find = this.memberList.findIndex(v => v.id === user.id);
      this.memberList[find] = response.data;
      this.memberList = this.memberList;
      return true;
    }
    return false;
  });

  @computed
  get memberCount() {
    return this.memberList.length;
  }

  @computed
  get memberPhoneNumbers() {
    return this.memberList.map(m => m.phone_number);
  }

  @computed
  get regularMemberCount() {
    return this.memberList.filter(m => m.level === '정회원').length;
  }
}

export default MemberStore;
