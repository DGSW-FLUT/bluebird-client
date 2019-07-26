import {
 observable, action, computed, flow 
} from 'mobx';
import axios from '../../axios';

class MessageStore {
  sendMessage = (data) => {
    const response = axios.post('/message/send', { data });
    console.log(response.status);
    if (response.status === 204) {
      return true;
    }
    return false;
  };
}

export default MessageStore;
