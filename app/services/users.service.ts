import { HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { User } from "../shared/header/models/user.model";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})

export class UsersService {

  public onUsersFiltered = new Subject<any>();
  public userCreatedUpdated = new Subject<any>();

  public statusList: any[] = [
    { value: "0", viewValue: "Active" },
    { value: "1", viewValue: "Inactive" },
  ];

  public apiPrefix: string = "users";
  public userProfileUpdated = new Subject<boolean>();

  constructor(private apiService: ApiService, private http: HttpService) { }

  public getAvatar(AvatarUrl: string): string {
    return `${AvatarUrl}?nocache=${new Date().getTime()}`;
  }

  public getUsers() {
    return this.http.get(this.apiService.get('getUser'));
  }
  public getUsersFilter(queryParams?: any) {
    let params = new HttpParams()
    .set("PageSize", queryParams.PageSize)
    .set("PageNo", queryParams.PageNo);

    if (queryParams.Status) {
        params = params.set("Status", queryParams.Status);
    }

    if (queryParams.SearchString) {
        params = params.set("SearchString", queryParams.SearchString);
    }
    return this.http.get(this.apiService.get('getUser'), params);
}

  public addUser(user: User) {
    return this.http.post(this.apiService.get('addUser'), user);
  }

  // public saveUser(user: User, mode: string = "create"): Observable<any> {
  //   if (mode === "create") {
  //     return this.http.post(this.apiService.get(this.apiPrefix), user);
  //   } else {
  //     return this.http.put(
  //       `${this.apiService.get(this.apiPrefix)}/${user.Id}`,
  //       user
  //     );
  //   }
  // }

  public getUserById(userId: string): Observable<User> {
    return this.http.get(`${this.apiService.get(this.apiPrefix)}/${userId}`);
  }

  public isUserExit(userName: string): Observable<any> {
    console.log(`${this.apiService.get('isUserExit')}/${userName}`);
    return this.http.get(`${this.apiService.get('isUserExit')}/${userName}`);

    // return this.http.get(this.apiService.get(this.isUserExit));    
  }

  public getPagedUsers(queryParams?: any): Observable<User[]> {
    let params = new HttpParams()
      .set("pageSize", queryParams.pageSize)
      .set("pageNo", queryParams.pageNo);

    if (queryParams.status) {
      params = params.set("status", queryParams.status);
    }

    if (queryParams.searchString) {
      params = params.set("searchString", queryParams.searchString);
    }

    if (queryParams.cabinetId) {
      params = params.set("cabinetId", queryParams.cabinetId);
    }

    if (queryParams.orderBy) {
      params = params.set("OrderBy", queryParams.orderBy);
    }

    return this.http.get(this.apiService.get('getPagedUsers'), params);
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiService.get(this.apiPrefix)}/${userId}`);
  }

  public updateUserProfile(data: any): Observable<any> {
    return this.http.put(this.apiService.get("updateUserProfile"), data.user);
  }

  public changeUserStatus(id: string, status: number): Observable<any> {
    return this.http.put(this.apiService.get("changeUserStatus"), { Id: id, Status: status });
  }

  public uploadUserAvatar(formData: FormData): Observable<any> {
    return this.http.post(this.apiService.get("userAvatar"), formData, {
      skipContentType: "true",
    });
  }

  public deleteUserAvatar(): Observable<any> {
    return this.http.delete(this.apiService.get("userAvatar"));
  }
}
