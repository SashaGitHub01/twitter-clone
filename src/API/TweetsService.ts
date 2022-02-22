import { instance } from "./instance";
import { ITweet } from "../types/ITweet";
import { IResponse } from "./types/response";

class TweetsService {
   static fetchTweets = async (): Promise<ITweet[]> => {
      const res = await instance.get<IResponse<ITweet[]>>('/tweets');

      return res.data.data;
   }

   static fetchMediaTweets = async (id: string): Promise<ITweet[]> => {
      const res = await instance.get<IResponse<ITweet[]>>(`/tweets/${id}/filter/media`);

      return res.data.data;
   }

   static fetchLikesTweets = async (id: string): Promise<ITweet[]> => {
      const res = await instance.get<IResponse<ITweet[]>>(`/tweets/${id}/filter/likes`);

      return res.data.data;
   }

   static addNewTweet = async (text: string, images?: string[]): Promise<ITweet> => {
      const res = await instance.post<IResponse<ITweet>>('/tweets', { text, images });

      return res.data.data;
   }

   static fetchOneTweet = async (id: string): Promise<ITweet> => {
      const res = await instance.get<IResponse<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }

   static deleteTweet = async (id: string): Promise<ITweet> => {
      const res = await instance.delete<IResponse<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }
}

export default TweetsService;