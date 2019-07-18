import LayoutStore from './Layout';
import MemberStore from './Member';
import AdminStore from './Admin';

export default {
  layout: new LayoutStore(),
  member: new MemberStore(),
  admin: new AdminStore()
};
