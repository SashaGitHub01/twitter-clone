import axios from "axios";
import { ISignIn, ISignUp } from "../types/AuthTypes";
import { IUser } from "../types/IUser";

interface IAuthResponse {
   status?: string,
   data: IUser | null
}


class AuthService {
   static signIn = async (data: ISignIn): Promise<IUser | null> => {
      const res = await axios.post<IAuthResponse>('/auth/login', data);

      return res.data.data;
   }

   static signUp = async (data: ISignUp): Promise<IUser | null> => {
      const res = await axios.post<IAuthResponse>('/auth/register', data, {
         withCredentials: true
      });

      return res.data.data;
   }

   static authMe = async (): Promise<IUser | null> => {
      const res = await axios.get<IAuthResponse>('/auth/me');

      return res.data.data;
   }
}

export default AuthService;