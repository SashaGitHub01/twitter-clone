import axios from "axios";

class TrandsService {
   static fetchTrands = async () => {
      const res = await axios.get('/trands?_limit=5');

      return res.data;
   }
}

export default TrandsService;