import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  public onViewFormDetails = new Subject<any>();

  constructor(
    private http: HttpService,
    private apiService: ApiService,
  ) { }

  public setWidgets(widgets: any[]): Observable<any> {
    return this.http.post(`${this.apiService.get("setWidgets")}`, widgets);
  }

  public getWidgets(): Observable<any> {
    return this.http.get(`${this.apiService.get("getWidgets")}`);
  }

  public setRecentFormFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiService.get("setRecentFormFilters")}`, filters);
  }

  public setFormsSentFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiService.get("setFormsSentFilters")}`, filters);
  }

  public setFormsCompletedFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiService.get("setFormsCompletedFilters")}`, filters);
  }

  public setFormsOpenedFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiService.get("setFormsOpenedFilters")}`, filters);
  }

  public setFormsByMonthFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiService.get("setFormsByMonthFilters")}`, filters);
  }

  public getFormsSent(): Observable<any> {
    return this.http.get(`${this.apiService.get("getFormsSent")}`);
  }

  public getFormsCompleted(): Observable<any> {
    return this.http.get(`${this.apiService.get("getFormsCompleted")}`);
  }

  public getFormsOpened(): Observable<any> {
    return this.http.get(`${this.apiService.get("getFormsOpened")}`);
  }

  public getRecentForms(): Observable<any> {
    return this.http.get(`${this.apiService.get("getRecentForms")}`);
  }

  public getFormDetails(formId: string) {
    return this.http.get(`${this.apiService.get("getFormDetails")}/${formId}`);
  }

  public getFormSharingLink(formId: string) {
    let url = this.apiService.get("getFormToShare");
    url = url.replace('{formId}', formId);

    // send APi call to get sharing link
    return this.http.get(url);
  }

  public getFormToken(token: string) {
    let url = this.apiService.get("getFormToken");
    url = url.replace('{token}', token);

    // send APi call to get sharing link
    return this.http.get(url);
  }

  public getFormsByMonth(): Observable<any> {
    return this.http.get(`${this.apiService.get("getFormsByMonth")}`);
  }
}
