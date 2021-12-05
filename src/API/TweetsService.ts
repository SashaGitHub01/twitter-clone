import axios from "axios";
import { IImage } from "../types/IImage";
import { INewTweet } from "../types/INewTweet";
import { ITweet } from "../types/ITweet";
import { IResponse } from "./types/response";

class TweetsService {
   static fetchTweets = async (): Promise<ITweet[]> => {
      const res = await axios.get<IResponse<ITweet[]>>('/tweets');

      return res.data.data;
   }

   static addNewTweet = async (text: string, images?: string[]): Promise<ITweet> => {
      const res = await axios.post<IResponse<ITweet>>('/tweets', { text, images });

      return res.data.data;
   }

   static fetchOneTweet = async (id: string): Promise<ITweet> => {
      const res = await axios.get<IResponse<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }

   static deleteTweet = async (id: string): Promise<ITweet> => {
      const res = await axios.delete<IResponse<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }
}

export default TweetsService;