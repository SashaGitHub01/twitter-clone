import axios from "axios";
import { IUser } from "../types/userscol";

export interface Response<T> {
   status?: string,
   data: T
}

class UsersService {
   static fetchColUsers = async (): Promise<IUser[]> => {
      const res = await axios.get<Response<IUser[]>>('/users');

      return res.data.data;
   }
}

export default UsersService;