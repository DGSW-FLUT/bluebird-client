import { observable, flow } from 'mobx';
import axios from '../../axios';

class BackupStore {
  @observable
  backupList = [
    {
      id: 1,
      dump_data: '{}',
      created_at: '2019-07-19 11:24:07'
    }
  ];

  fetchBackupList = flow(function* () {
    const response = yield axios.get('/backup');
    if (response.status === 200) {
      this.backupList = response.data.map((b) => {
        b.dump_data = JSON.parse(b.dump_data);
        b.userCount = b.dump_data.length;
        return b;
      });
    }
  })
}

export default BackupStore;
