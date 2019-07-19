import { observable } from 'mobx';

class BackupStore {
  @observable
  backupList = [];
}

export default BackupStore;
