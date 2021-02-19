import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class UserFormService {

  constructor(private apiService: ApiService, private http: HttpService) { }

  public getFormObject(formToken: string) {
    return this.http.get(`${this.apiService.get("form")}/${formToken}`);
  }

  public getRecaptcha() {
    return this.http.get(`${this.apiService.get("getRecaptcha")}`);
  }

  public submitForm(token: string, formData: any) {
    return this.http.post(`${this.apiService.get("form")}/${token}`, formData);
  }
}
