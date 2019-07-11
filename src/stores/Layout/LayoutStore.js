import { observable, action } from 'mobx';

class LayoutStore {
  @observable
  isCollapsed = false;

  @action.bound
  setCollapsed(payload) {
    this.isCollapsed = payload;
  }

  @action.bound
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}

export default LayoutStore;
