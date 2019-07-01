import { observable, action } from 'mobx';

class TestStore {
  @observable
  value = 1;

  @action.bound
  setValue(payload) {
    this.value = payload;
  }
}

export default TestStore;
