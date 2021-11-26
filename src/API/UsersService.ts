import axios from "axios";

class UsersService {
   static fetchColUsers = async () => {
      const res = await axios.get('/users?_limit=3');

      return res.data;
   }
}

export default UsersService;