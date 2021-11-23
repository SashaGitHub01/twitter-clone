import axios from "axios";

class TweetsService {
   static fetchTweets = async () => {
      const res = await axios.get('/tweets');

      return res.data;
   }
}

export default TweetsService;