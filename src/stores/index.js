import LayoutStore from './Layout';
import MemberStore from './Member';
import AdminStore from './Admin';
import BackupStore from './Backup';
import MessageStore from './Message';

export default {
  layout: new LayoutStore(),
  member: new MemberStore(),
  // AdminStore is SingleTon
  admin: AdminStore.getInstance(),
  backup: new BackupStore(),
  message: new MessageStore()
};
