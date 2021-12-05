import { IUser } from "./IUser";

export interface IComment {
   _id: string,
   text: string,
   user: IUser,
   createdAt: string,
   tweet: string
}