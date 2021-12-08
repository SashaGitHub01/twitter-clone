import { ITweet } from "./ITweet";

export interface IUser {
   fullName: string,
   username: string,
   email: string,
   _id: string,
   likes: string[],
   createdAt: string
   avatar_url: string,
   confirmed?: boolean,
   confirmed_hash?: string,
   tweets?: ITweet[],
}