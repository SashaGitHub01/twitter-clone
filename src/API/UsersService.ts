import { IUser } from "../types/IUser";
import { instance } from "./instance";
import { IResponse } from "./types/response";

class UsersService {
   static fetchColUsers = async (): Promise<IUser[]> => {
      const res = await instance.get<IResponse<IUser[]>>('/users');

      return res.data.data;
   }

   static fetchUser = async (username: string): Promise<IUser> => {
      const res = await instance.get<IResponse<IUser>>(`/users/${username}`);

      return res.data.data;
   }
}

export default UsersService;