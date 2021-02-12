import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  public isSetupRequired: boolean = null;
  public isLicenseRequired: boolean = null;

  constructor(
    private http: HttpService,
    private apiService: ApiService) { }

  public getWizardStatus(): Observable<any> {
    return this.http.get(this.apiService.get("getSetupWizardStatus"));
  }

  public getMailServers(): Observable<any> {
    return this.http.get(this.apiService.get("getSetupWizardMailServers"));
  }

  public updateLanguage(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardLanguage"), data);
  }

  public updateLicense(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardLicense"), data);
  }

  public putLicense(data: any): Observable<any> {
    return this.http.put(this.apiService.get("updateSetupWizardLicense"), data);
  }

  public updateSql(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardSql"), data);
  }

  public updateRepository(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardRepository"), data);
  }

  public updateRecaptcha(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardRecaptcha"), data);
  }

  public updateSmtp(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardSmtp"), data);
  }

  public updateAccount(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updateSetupWizardAccount"), data);
  }
}
