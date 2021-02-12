import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpService,
    private apiService: ApiService) { }

  public getSmtpSettings(): Observable<any> {
    return this.http.get(this.apiService.get("systemConfigurationSmtp"));
  }

  public updateSmtpSettings(data: any): Observable<any> {
    return this.http.put(this.apiService.get("systemConfigurationSmtp"), data);
  }

  public getReCaptchaSettings(): Observable<any> {
    return this.http.get(this.apiService.get("systemConfigurationReCaptcha"));
  }

  public updateReCaptchaSettings(data: any): Observable<any> {
    return this.http.put(this.apiService.get("systemConfigurationReCaptcha"), data);
  }

  public getSessionCleanupSettings(): Observable<any> {
    return this.http.get(this.apiService.get("systemConfigurationSessionCleanup"));
  }

  public updateSessionCleanupSettings(data: any): Observable<any> {
    return this.http.post(this.apiService.get("systemConfigurationSessionCleanup"), data);
  }

  public getFormattedDate(dateString: string): string {
    // create date object from string
    const date = new Date(dateString);

    // convert to local date string format
    return date.toLocaleString();
  }

  public convertDataURIToBinary(dataURI: any): any {
    let BASE64_MARKER = ";base64,";

    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}
