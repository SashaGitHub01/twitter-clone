import axios from "axios";
import { ITweet } from "../types/tweets";

export interface Response<T> {
   status?: string,
   data: T
}

class TweetsService {
   static fetchTweets = async (): Promise<ITweet[]> => {
      const res = await axios.get<Response<ITweet[]>>('/tweets');

      return res.data.data;
   }

   static addNewTweet = async (text: string): Promise<ITweet> => {
      const res = await axios.post<Response<ITweet>>('/tweets', text);

      return res.data.data;
   }

   static fetchOneTweet = async (id: string): Promise<ITweet> => {
      const res = await axios.get<Response<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }
}

export default TweetsService;