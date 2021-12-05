import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface ITweet {
   text: string,
   _id: string,
   createdAt: string,
   user: IUser,
   images?: string[],
   comments?: IComment[],
}