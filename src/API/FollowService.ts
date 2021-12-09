import axios from "axios";
import { IResponse } from "./types/response";
import { ITweet } from "../types/ITweet";

export class FollowService {
   static follow = async (id: string): Promise<string> => {
      const res = await axios.post<IResponse<string>>(`/follow/${id}`);

      return res.data.data;
   }

   static unfollow = async (id: string): Promise<string> => {
      const res = await axios.delete<IResponse<string>>(`/follow/${id}`);

      return res.data.data;
   }
}