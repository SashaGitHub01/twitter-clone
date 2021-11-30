import axios from "axios";
import { IUser } from "../types/IUser";
import { IResponse } from "./types/response";

class UsersService {
   static fetchColUsers = async (): Promise<IUser[]> => {
      const res = await axios.get<IResponse<IUser[]>>('/users');

      return res.data.data;
   }
}

export default UsersService;