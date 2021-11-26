import axios from "axios";
import { ITweet } from "../types/tweets";

class TweetsService {
   static fetchTweets = async () => {
      const res = await axios.get('/tweets');

      return res.data;
   }

   static addNewTweet = async (tweet: ITweet) => {
      const res = await axios.post('/tweets', tweet);

      return res.data;
   }

   static fetchOneTweet = async (id: string) => {
      const res = await axios.get(`/tweets?_id=${id}`);

      return res.data[0];
   }
}

export default TweetsService;