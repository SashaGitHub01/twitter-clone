import { instance } from "./instance";
import { IResponse } from "./types/response";

export class LikesService {
   static like = async (id: string): Promise<string> => {
      const res = await instance.post<IResponse<string>>(`/likes/${id}`);

      return res.data.data;
   }
}