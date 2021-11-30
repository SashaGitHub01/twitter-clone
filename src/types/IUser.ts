export interface IUser {
   fullName: string,
   username: string,
   email: string,
   _id: string,
   avatar_url?: string,
   confirmed?: boolean,
   confirmed_hash?: string,
}