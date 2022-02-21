import axios from "axios";
import { IResponse } from "./types/response";
import { ITweet } from "../types/ITweet";

export class LikesService {
   static like = async (id: string): Promise<string> => {
      const res = await axios.post<IResponse<string>>(`/likes/${id}`);

      return res.data.data;
   }
}