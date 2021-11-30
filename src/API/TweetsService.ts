import axios from "axios";
import { ITweet } from "../types/ITweet";
import { IResponse } from "./types/response";

class TweetsService {
   static fetchTweets = async (): Promise<ITweet[]> => {
      const res = await axios.get<IResponse<ITweet[]>>('/tweets');

      return res.data.data;
   }

   static addNewTweet = async (text: string): Promise<ITweet> => {
      const res = await axios.post<IResponse<ITweet>>('/tweets', text);

      return res.data.data;
   }

   static fetchOneTweet = async (id: string): Promise<ITweet> => {
      const res = await axios.get<IResponse<ITweet>>(`/tweets/${id}`);

      return res.data.data;
   }
}

export default TweetsService;