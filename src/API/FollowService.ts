import { instance } from "./instance";
import { IResponse } from "./types/response";

export class FollowService {
   static follow = async (id: string): Promise<string> => {
      const res = await instance.post<IResponse<string>>(`/follow/${id}`);

      return res.data.data;
   }

   static unfollow = async (id: string): Promise<string> => {
      const res = await instance.delete<IResponse<string>>(`/follow/${id}`);

      return res.data.data;
   }
}