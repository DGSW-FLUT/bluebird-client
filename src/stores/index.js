import LayoutStore from './Layout';
import MemberStore from './Member';
import AdminStore from './Admin';
import BackupStore from './Backup';
import ManagerStore from './Manager';

export default {
  layout: new LayoutStore(),
  member: new MemberStore(),
  // AdminStore is SingleTon
  admin: AdminStore.getInstance(),
  backup: new BackupStore(),
  manager: new ManagerStore()
};
