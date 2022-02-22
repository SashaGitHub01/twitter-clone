import { instance } from "./instance";
import { ISignIn, ISignUp } from "../types/AuthTypes";
import { IUser } from "../types/IUser";

interface IAuthResponse {
   status?: string,
   data: IUser | null
}


class AuthService {
   static signIn = async (data: ISignIn): Promise<IUser | null> => {
      const res = await instance.post<IAuthResponse>('/auth/login', data);

      return res.data.data;
   }

   static signUp = async (data: ISignUp): Promise<IUser | null> => {
      const res = await instance.post<IAuthResponse>('/auth/register', data, {
         withCredentials: true
      });

      return res.data.data;
   }

   static authMe = async (): Promise<IUser | null> => {
      const res = await instance.get<IAuthResponse>('/auth/me');

      return res.data.data;
   }

   static logout = async (): Promise<any> => {
      await instance.get('/auth/logout');

      return;
   }
}

export default AuthService;