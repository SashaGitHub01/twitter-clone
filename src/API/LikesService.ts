import axios from "axios";
import { IResponse } from "./types/response";
import { ITweet } from "../types/ITweet";

export class LikesService {
   static createLike = async (id: string): Promise<ITweet> => {
      const res = await axios.post<IResponse<ITweet>>(`/likes/${id}`);

      return res.data.data;
   }

   static deleteLike = async (id: string): Promise<ITweet> => {
      const res = await axios.delete<IResponse<ITweet>>(`/likes/${id}`);

      return res.data.data;
   }
}