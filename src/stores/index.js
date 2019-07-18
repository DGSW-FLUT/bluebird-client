import LayoutStore from './Layout';
import MemberStore from './Member/MemberStore';
import AdminStore from './Admin/AdminStore';

export default {
  layout: new LayoutStore(),
  member: new MemberStore(),
  admin: new AdminStore()
};
