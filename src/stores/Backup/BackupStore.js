import {
  observable, flow, action, computed
} from 'mobx';
import axios from '../../axios';

class BackupStore {
  @observable
  backupList = [
    {
      id: 1,
      dump_data: '[]',
      created_at: '2019-07-19 11:24:07'
    }
  ];

  fetchBackupList = flow(function* () {
    const response = yield axios.get('/backup');
    if (response.status === 200) {
      this.backupList = response.data;
    }
  })

  @computed
  get backups() {
    return this.backupList.map((b) => {
      const dumpData = JSON.parse(b.dump_data);
      return {
        ...b,
        dump_data: dumpData.filter(d => d.deleted_at === null),
        userCount: dumpData.length
      };
    });
  }

  @action
  addBackup = flow(function* () {
    const response = yield axios.get('/backup/save');
    if (response.status === 200) {
      const result = response.data;
      this.backupList = this.backupList.concat(result);
      return true;
    }
    return false;
  })
}

export default BackupStore;
