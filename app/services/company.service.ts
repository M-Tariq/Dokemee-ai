import { HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CompanyManager } from '../pages/admin/models/company.manager.model';
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: "root",
})

export class CompanyService {

    constructor(private apiService: ApiService, private http: HttpService) { }


    public getCompaniesManagers() {
        return this.http.get(this.apiService.get('getCompaniesManagers'));
    }
    public getCompaniesFilter(queryParams?: any) {
        let params = new HttpParams()
        .set("PageSize", queryParams.PageSize)
        .set("PageNo", queryParams.PageNo);

        if (queryParams.Status) {
            params = params.set("Status", queryParams.Status);
        }

        if (queryParams.SearchString) {
            params = params.set("SearchString", queryParams.SearchString);
        }

        if (queryParams.IsAscending) {
            params = params.set("IsAscending", queryParams.IsAscending);
        }

        if (queryParams.OrderBy) {
            params = params.set("OrderBy", queryParams.OrderBy);
        }

        return this.http.get(this.apiService.get('getCompaniesManagers'), params);
    }

    public AddCompany(company: CompanyManager) {
        return this.http.post(this.apiService.get('addCompany'), company);
    }
}
