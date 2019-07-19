import { observable } from 'mobx';

class BackupStore {
  @observable
  backupList = [
    {
      idx: 1,
      dump_sql_path: 'test.sql',
      created_at: '2019-07-19 11:24:07'
    }
  ];
}

export default BackupStore;
