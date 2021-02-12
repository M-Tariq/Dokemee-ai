export interface User {
  Id: string;
  AvatarUrl: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedDate: string;
  Status: string;
  Password?: string;
  ExpirationDate?: string;
  IsTemporaryPassword: boolean;
}


export enum UserStatus {
  "InActive" = 0,
  "Temporary" = 1,
  "Permanent" = 2
}