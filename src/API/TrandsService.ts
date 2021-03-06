import { instance } from "./instance";

class TrandsService {
   static fetchTrands = async () => {
      const res = await instance.get('/trands?_limit=5');

      return res.data;
   }
}

export default TrandsService;