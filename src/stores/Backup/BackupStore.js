/* eslint-disable no-restricted-globals */
import {
  observable, flow, action, computed
} from 'mobx';
import { notification } from 'antd';
import axios from '../../axios';

class BackupStore {
  @observable
  backupList = [];

  removeBackup = flow(function* (id) {
    const response = yield axios.delete(`/backup/${id}`);
    if (response.status === 204) {
      const find = this.backupList.findIndex(v => v.id === id);
      this.backupList.splice(find, 1);
      this.backupList = this.backupList;
      return true;
    }
    return false;
  })

  rollback = flow(function* (id) {
    const response = yield axios.get(`/backup/rollback/${id}`);
    if (response.status === 200) {
      const NOTIFY_ID = 'reload_timer_notify';
      let time = 3;

      notification.success({
        key: NOTIFY_ID,
        message: '복구를 성공했습니다.',
        description: `${time}초 뒤에 페이지가 새로고침 됩니다.`
      });
      setInterval(() => {
        time -= 1;
        if (time === 0) {
          location.href = '/';
          return;
        }
        notification.success({
          key: NOTIFY_ID,
          message: '복구를 성공했습니다.',
          description: `${time}초 뒤에 페이지가 새로고침 됩니다.`
        });
      }, 1000);
    } else {
      notification.error({
        message: '복구 실패',
        description: `${response.message}`
      });
    }
  })

  fetchBackupList = flow(function* () {
    const response = yield axios.get('/backup');
    if (response.status === 200) {
      this.backupList = response.data;
    }
  })

  @computed
  get backups() {
    return this.backupList.map((b) => {
      const dumpData = JSON.parse(b.dump_data).filter(d => d.deleted_at === null);
      return {
        ...b,
        dump_data: dumpData,
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
