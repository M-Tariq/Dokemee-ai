import { SrvRecord } from "dns";

export class User {
  Id: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Status: number;
  ExpirationDate: string;
  UserRole: number;
  AvatarUrl: string;
  CompanyId: string;
  Role: string;
  LangCode: string;
  constructor() {
    this.FirstName = "";
    this.LastName = "";
    this.Email = "";
    this.Status = 0;
    this.UserRole = 0;
    this.ExpirationDate = "";
    this.AvatarUrl = "";
    this.CompanyId="";
    this.Role="";
    this.LangCode="";
  }
}
