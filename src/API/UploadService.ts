import axios from "axios";
import { IImage } from "../types/IImage";
import { IResponse } from "./types/response";

class UploadService {
   static uploadImages = async (data: IImage[]): Promise<string[]> => {
      const formData = new FormData();

      data.map(({ file }) => {
         formData.append('images', file);
      })

      const res = await axios.post<IResponse<string[]>>('/upload', formData, {
         headers: {
            "Content-Type": 'multipart/form-data'
         }
      });

      return res.data.data;
   }
}

export default UploadService;