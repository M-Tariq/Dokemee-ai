import { EcmCabinets, EcmLogin, EcmMapping } from "./../models/EcmDataExport";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EcmConnectorService {
  public xmlFileProps = [
    "DATABASENAME",
    "PASSWORD",
    "SERVERNAME",
    "SQLSERVERNAME",
    "UID",
    "URL",
  ];

  constructor(private http: HttpService, private apiService: ApiService) {}

  public ecmWebConnect(form: any): Observable<any> {
    return this.http.post(this.apiService.get("ecmWebConnect"), form);
  }

  public getEcmCabinets(form: any): Observable<EcmCabinets[]> {
    return this.http.post(this.apiService.get("getEcmCabinets"), form);
  }

  public getEcmCabinetIndexes(cabinetId: string) {
    let url = this.apiService.get("getEcmCabinetIndexes");
    url = url.replace("{cabinetId}", cabinetId);
    return this.http.get(url);
  }

  public getMappedIndexes(formId: string, ecmCabinetId: string) {
    let url = this.apiService.get("getMappedIndexes");
    url = url.replace("{formId}", formId);
    url = url.replace("{ecmCabinetId}", ecmCabinetId);
    return this.http.get(url);
  }

  public saveMappedIndexes(mappedIndexes: EcmMapping) {
    let url = this.apiService.get("saveMappedIndexes");
    return this.http.post(url, mappedIndexes);
  }

  public retransmitPagesToECM(EcmMapping: EcmMapping, FormHtml: string, fromPageNumber: string, toPageNumber: string) {
    let url = this.apiService.get("retransmitPagesToECM");
    let retransmitData = { EcmMapping, FormHtml, fromPageNumber, toPageNumber }

    return this.http.post(url, retransmitData);
  }

  public saveEcmUser(user: EcmLogin) {
    let url = this.apiService.get("saveEcmUser");
    return this.http.post(url, user);
  }

  public getFormConnections(formId: any): Observable<EcmLogin> {
    let url = this.apiService.get("getFormConnection");
    url = url.replace("{formId}", formId);
    return this.http.get(url);
  }
}
