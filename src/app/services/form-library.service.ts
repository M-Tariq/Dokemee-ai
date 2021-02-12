import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class FormLibraryService {

  public cabinetUpdated = new Subject<any>();

  constructor(private apiService: ApiService, private http: HttpService) { }

  public getCabinetAllFilesFolders(cabinetId: string) {
    const params = new HttpParams()
      .set("folder", "true")
      .set("pageSize", "2000")
      .set("pageNo", "1")
      .set("orderBy", "Title")
      .set("isAscending", "true");

    const formType: string = "SimpleForm";
    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}`,
      params
    );
  }

  public getSimpleFormFoldersByCabinet(cabinetId: string, includeTemplateFolder: boolean = false) {
    const params = new HttpParams().set("includeTemplateFolder", includeTemplateFolder.toString());

    let url = this.apiService.get('getSimpleFormFoldersByCabinet');
    url = url.replace('{cabinetId}', cabinetId);

    return this.http.get(url, params);
  }

  public getImageOverlayFormFoldersByCabinet(cabinetId: string, includeTemplateFolder: boolean = false) {
    const params = new HttpParams().set("includeTemplateFolder", includeTemplateFolder.toString());

    let url = this.apiService.get('getImageOverlayFormFoldersByCabinet');
    url = url.replace('{cabinetId}', cabinetId);

    return this.http.get(url, params);
  }

  public getFormTypeByFormId(formId: string)
  {
    let url = this.apiService.get("getFormTypeById");
    url = url.replace('{formId}', formId);
    return this.http.get(url);
  }

  public getSimpleFormList(cabinetId: string, queryParams?: any) {
    const params = new HttpParams()
      .set("folders", queryParams.folders)
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo)
      .set("orderBy", queryParams.orderBy)
      .set("isAscending", queryParams.isAscending);

    const formType: string = "SimpleForm";
    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}`,
      params
    );
  }

  public getImageOverlayFormList(cabinetId: string, queryParams?: any) {
    const params = new HttpParams()
      .set("folders", queryParams.folders)
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo)
      .set("orderBy", queryParams.orderBy)
      .set("isAscending", queryParams.isAscending);

    const formType: string = "ImageOverlayForm";
    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}`,
      params
    );
  }

  public getCabinetFolders(cabinetId: string) {
    const formType: string = "SimpleForm";
    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/Folder/${formType}`);
  }

  public getAllCabinetFolders(cabinetId: string) {
    return this.http.get(
      `${this.apiService.get("cabinetForms")}/${cabinetId}/Folders`
    );
  }

  // get simple folder's forms
  public getFolderFormsList(formType: string, cabinetId: string, folderId: string, queryParams?: any) {
    const params = new HttpParams()
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo)
      .set("orderBy", queryParams.orderBy)
      .set("isAscending", queryParams.isAscending);

    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}/Folder/${folderId}`,
      params
    );
  }

  public getAllFolderFiles(cabinetId: string, folderId: string, formType: string) {
    const params = new HttpParams()
      .set("folder", "true")
      .set("pageSize", "2000")
      .set("pageNo", "1")
      .set("orderBy", "Title")
      .set("isAscending", "true");

    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}/Folder/${folderId}`,
      params
    );
  }


  public getSimpleFormTemplateList(formType: string = 'SimpleForm', cabinetId: string, queryParams?: any) {
    const params = new HttpParams()
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo)
      .set("orderBy", queryParams.orderBy)
      .set("isAscending", queryParams.isAscending);

    return this.http.get(`${this.apiService.get("cabinetForms")}/${cabinetId}/${formType}/Template`,
      params
    );
  }

  public getSingleImageOverlayFormTemplate(id: string) {
    let url = this.apiService.get('getSingleImageOverlayFormTemplate');
    url = url.replace('{id}', id);

    return this.http.get(url);
  }

  public getSimpleFormById(id: string) {
    return this.http.get(`${this.apiService.get("getSimpleFormById")}/${id}`);
  }

  public getImageOverlayFormById(id: string) {
    return this.http.get(`${this.apiService.get("imageOverlayForm")}/${id}`);
  }

  public getSimpleFormTemplateById(id: string) {
    return this.http.get(`${this.apiService.get("getSimpleFormTemplateById")}/${id}`);
  }

  public getImageOverlayFormTemplateById(id: string) {
    return this.http.get(`${this.apiService.get("getImageOverlayFormTemplateById")}/${id}`);
  }

  public publishFormToggle(formId: string, publish: boolean, formType: string) {
    let action = publish ? "Publish" : "Unpublish";
    let urlPrefix = formType === 'simpleForms' ? this.apiService.get("simpleForm") : this.apiService.get("imageOverlayForm");
    return this.http.post(`${urlPrefix}/${formId}/${action}`, {});
  }

  public editFormSentCount(formId: string, sentCount: number, formType: string) {
    let urlPrefix = formType === 'simpleForms' ? this.apiService.get("simpleForm") : this.apiService.get("imageOverlayForm");
    return this.http.put(`${urlPrefix}/${formId}/SentCount`, sentCount);
  }

  //save form in simple folder
  public saveAsForm(formId: string, data: any, formType: string) {
    let urlPrefix = formType === 'simpleForms' ? this.apiService.get("simpleForm") : this.apiService.get("imageOverlayForm");
    return this.http.post(`${urlPrefix}/${formId}/Copy`, data);
  }

  public saveAsTemplate(formId: string, data: any, formType: string) {
    let urlPrefix = formType === 'simpleForms' ? this.apiService.get("simpleForm") : this.apiService.get("imageOverlayForm");
    return this.http.post(`${urlPrefix}/Template/${formId}/Copy`, data);
  }

  public saveFormAsTemplate(formId: string, data: any, formType: string) {
    let urlPrefix = formType === 'simpleForms' ? this.apiService.get("simpleForm") : this.apiService.get("imageOverlayForm");
    return this.http.post(`${urlPrefix}/${formId}/Template`, data);
  }

  public createFolder(data: any, type: string) {
    const url: string = this.apiService.get(type === '0' ? 'createSimpleFormFolder' : 'createImageOverlayFolder');
    return this.http.post(url, data);
  }

  public deleteFolder(id: string) {
    let url: string = this.apiService.get('deleteFolder');
    url = url.replace('{id}', id);
    return this.http.delete(url);
  }

  public updateFolder(id: string, data: any) {
    let url: string = this.apiService.get('updateFolder');
    url = url.replace('{id}', id);
    return this.http.put(url, data);
  }

  public getCabinets() {
    return this.http.get(this.apiService.get("getCabinets"));
  }

  public getCabinetById(id: string): Observable<any> {
    return this.http.get(`${this.apiService.get("getCabinetById")}/${id}`);
  }

  public getCabinetFolderById(id: string): Observable<any> {
    return this.http.get(`${this.apiService.get("getCabinetFolderById")}/${id}`);
  }

  public getCabinetFolderWithPermissionsById(id: string): Observable<any> {
    let url = this.apiService.get('getCabinetFolderWithPermissionsById');
    url = url.replace('{folderId}', id);
    return this.http.get(url);
  }

  public getCabinetDetail(id: any) {
    let url = this.apiService.get('getCabinetDetail');
    url = url.replace('{cabinetId}', id);
    return this.http.get(url);
  }

  public createCabinet(cabinet: any) {
    return this.http.post(this.apiService.get("saveCabinet"), cabinet);
  }

  public editCabinet(cabinet: any, cabinetId: string) {
    return this.http.put(`${this.apiService.get("saveCabinet")}/${cabinetId}`, cabinet);
  }

  public deleteMultipleForms(cabinetId: string, formIds: any[], folderType: string, formType: string) {
    let url: string;

    if (formType === 'simpleForms') {
      url = this.apiService.get(folderType === 'templates' ?
        'deleteMultipleSimpleFormTemplates' : 'deleteMultipleSimpleForms');
    }
    else {
      url = this.apiService.get(folderType === 'templates' ?
        'deleteMultipleImageOverlayFormTemplates' : 'deleteMultipleImageOverlayForms');
    }

    url = url.replace('{cabinetId}', cabinetId);
    return this.http.post(url, { Ids: formIds, });
  }

  public getFormUrlAliasAvailable(formId: string, alias: any) {
    return this.http.post(this.apiService.get("getFormUrlAliasAvailable"), { formId, alias });
  }

  public saveFormUrlAlias(formId: string, alias: any) {
    let url = this.apiService.get("saveFormUrlAlias");
    url = url.replace('{formId}', formId);
    return this.http.put(url, { alias });
  }

  public removeFormUrlAlias(formId: string) {
    let url = this.apiService.get("removeFormUrlAlias");
    url = url.replace('{formId}', formId);
    return this.http.put(url, {});
  }

  public moveForm(formId: string, data: any, formType: string) {
    let url: string;

    if (formType === 'simpleForms') {
      url = this.apiService.get("moveSimpleForm");
    }
    else {
      url = this.apiService.get("moveImageOverlayForm");
    }

    url = url.replace('{formId}', formId);
    return this.http.post(url, data);
  }

  public moveFormTemplate(formId: string, data: any, formType: string) {
    let url: string;

    if (formType === 'simpleForms') {
      url = this.apiService.get("moveSimpleFormTemplate");
    }
    else {
      url = this.apiService.get("moveImageOverlayFormTemplate");
    }

    url = url.replace('{formId}', formId);
    return this.http.post(url, data);
  }

  public getFormActiveSessions(formId: string) {
    let url = this.apiService.get("getFormActiveSessions");
    url = url.replace('{formId}', formId);
    return this.http.get(url);
  }
}
