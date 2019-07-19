import LayoutStore from './Layout';
import MemberStore from './Member';
import AdminStore from './Admin';
import BackupStore from './Backup';

export default {
  layout: new LayoutStore(),
  member: new MemberStore(),
  admin: new AdminStore(),
  backup: new BackupStore()
};
