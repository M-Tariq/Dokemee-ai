import { TokenDetail } from "./../models/Token";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { ApiService } from "./api.service";
import { HttpService } from "./http.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../shared/header/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: User;
  public loggingOutFromBuilder: boolean = false;
  public roleUpdated = new Subject<any>();
  public forceLogout: boolean = false;

  constructor(
    private http: HttpService,
    private dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) { }

  public refreshToken(data): Observable<any> {
    let url = this.apiService.get("getRefreshToken");
    return this.http.post(url, data);
  }

  public loginUser(loginData: any): Observable<any> {
    return this.http.post(this.apiService.get("login"), loginData);
  }

  public updatePassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("updatePassword"), data);
  }

  public logoutUser(): Observable<any> {
    return this.http.post(this.apiService.get("logout"), {});
  }

  public forgotPassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("forgotPassword"), data);
  }

  public resetPassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("resetPassword"), data);
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post(this.apiService.get("changePassword"), data);
  }

  public getUserProfile(): Observable<any> {
    return this.http.get(this.apiService.get("getUserProfile"));
  }
  public updateUserProfile(data: any): Observable<any> {
    return this.http.put(this.apiService.get("updateUserProfile"), data);
  }

  public getReCaptchaSettings(): Observable<any> {
    return this.http.get(
      this.apiService.get("getSystemConfigurationReCaptcha")
    );
  }

  public postReCaptchaSettings(data: any): Observable<any> {
    return this.http.post(
      this.apiService.get("postSystemConfigurationReCaptcha"),
      data
    );
  }

  public putReCaptchaSettings(data: any): Observable<any> {
    return this.http.put(
      this.apiService.get("updateSystemConfigurationReCaptcha"),
      data
    );
  }

  public getRolesByCabinetId(
    id: string,
    includeUsers: boolean = false
  ): Observable<any> {
    let url = this.apiService.get("getRolesByCabinetId");
    url = url.replace("{cabinetId}", id);

    const params = new HttpParams().set("includeUsers", String(includeUsers));
    return this.http.get(url, params);
  }

  public getRoleByIdWithPermissions(id: string): Observable<any> {
    let url = this.apiService.get("getRoleByIdWithPermissions");
    url = url.replace("{roleId}", id);
    return this.http.get(url);
  }

  public getRoleUsersById(id: string): Observable<any> {
    let url = this.apiService.get("getRoleUsersById");
    url = url.replace("{roleId}", id);
    return this.http.get(url);
  }

  public getAllPermissions(): Observable<any> {
    return this.http.get(`${this.apiService.get("getAllPermissions")}`);
  }

  public deleteRoleById(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiService.get("deleteRoleByRoleId")}/${id}`
    );
  }

  public createRole(data: any): Observable<any> {
    return this.http.post(`${this.apiService.get("createRole")}`, data);
  }

  public createRoleWithPermissions(data: any): Observable<any> {
    return this.http.post(
      `${this.apiService.get("createRoleWithPermissions")}`,
      data
    );
  }

  public editRole(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiService.get("editRole")}/${id}`, data);
  }

  public updateRoleWithPermissions(id: string, data: any): Observable<any> {
    let url = this.apiService.get("updateRoleWithPermissions");
    url = url.replace("{roleId}", id);
    return this.http.put(url, data);
  }

  public updateRoleUsers(id: string, data: any): Observable<any> {
    let url = this.apiService.get("updateRoleUsers");
    url = url.replace("{roleId}", id);
    return this.http.put(url, data);
  }

  public isAuthenticated(): boolean {
    // get token from browser session storage and return
    const token = localStorage.getItem("token");

    return token ? true : false;
  }

  public isSessionTimeout(): boolean {
    // get session timeout from browser session storage and return
    const timeout = sessionStorage.getItem("session-timeout");

    return timeout ? true : false;
  }

  public setSessionTimeout(): any {
    // set session timeout in browser session storage
    sessionStorage.setItem("session-timeout", 'true');
  }

  public removeSessionTimeout(): any {
    // remove session timeout from browser session storage
    sessionStorage.removeItem("session-timeout");
  }

  public getAuthToken(): string {
    // get token from browser session storage and return
    return localStorage.getItem("token");
  }

  

  public setRefreshToken(refreshToken: string): void {
    // set refresh token in browser session storage
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  public getRefreshToken(): string {
    // get refresh token in browser session storage
    return localStorage.getItem("refreshToken");
  }
  public setAuthToken(authToken: string): void {
    // set token in browser session storage
    localStorage.setItem("token", authToken);
  }

  public getTokenDetail(): TokenDetail {
    let tokenDetail = new TokenDetail();
    tokenDetail.Token = localStorage.getItem("token");
    tokenDetail.RefreshToken = localStorage.getItem("refresh-jwt");

    if (tokenDetail) {
      // returned JSON parsed user object
      return tokenDetail;
    }
  }

  public rememberUser(userName: string): void {
    // store user in session storage
    localStorage.setItem("rememberUser", userName);
  }

  public getRememberUser(): string {
    // store user in session storage
    return localStorage.getItem("rememberUser");
  }

  public clearPreviousRememberMeHistory(user: User): void {
    // get user from session storeage
    const username = localStorage.getItem("rememberUser");
    if (username != user.UserName) {
      localStorage.removeItem('rememberUser');
    }
  }

  public setCurrentUser(user: User): void {
    // store user in local storage 
    localStorage.setItem("user", JSON.stringify(user));

  }

  public getCurrentUser(): User {
    // get user from session storeage
    const user = localStorage.getItem("user");

    if (user) {
      // returned JSON parsed user object
      return JSON.parse(user);
    }
  }

  public removeJwt(): void {
    // remove token from browser session storage
    sessionStorage.removeItem("token");
  }

  public logoutRedirect(): void {
    // close all opened dialogs
    this.dialog.closeAll();
    // remove items from session storage
    localStorage.removeItem("token");

    // show login screen
    this.router.navigateByUrl("/");
  }

  public unauthorizedRedirect(): void {
    // close all opened dialogs
    this.dialog.closeAll();
    localStorage.removeItem("token");

    // show login screen
    this.router.navigate(["/"]);
  }

  public isAdminOrManager(): boolean {
    // get if user is super admin
    const isAdmin = this.isSuperAdmin();

    // get if user is cabinet manager
    const isManager = this.isCabinetManager();

    // return true if user is super admin or cabinet manager
    return isAdmin || isManager;
  }

  public isSuperAdmin(): boolean {
    // get user from session storage
    const user = this.getUserFromSessionStorage();

    if (user) {
      // return true if user role is SuperAdmin
      return user.Role === "SuperAdmin";
    }
  }

  private getUserFromSessionStorage(): any {
    // get JSON string from session storage
    const userString: string = sessionStorage.getItem("user");

    // if available
    if (userString) {
      // parse JSON string to object
      const user = JSON.parse(userString);

      // if available
      if (user) {
        // return user object
        return user;
      }
    }
  }

  public isCabinetManager(): boolean {
    // get user from session storage
    const user = this.getUserFromSessionStorage();

    if (user) {
      // return true of user is manager of at least 1 cabinet
      return user.ManagedCabinets && user.ManagedCabinets.length > 0;
    }
    return false;
  }

  public getManagedCabinets(): string[] {
    // get user from session storage
    const user = this.getUserFromSessionStorage();

    // return cabinets managed by user
    return user.ManagedCabinets;
  }

  public getFilteredManagedCabinets(cabinets: any[]): any[] {
    let filteredCabinets: any[] = [];

    // if user is not admin
    if (!this.isSuperAdmin()) {
      // get managed cabinets, cabinets that user is manager of
      const managedCabinets: string[] = this.getManagedCabinets();

      // extract cabinets that user is manager of and store in component
      filteredCabinets = cabinets.filter((cabinet: any) =>
        managedCabinets.includes(cabinet.Id)
      );
    } else {
      // store cabinets in component
      filteredCabinets = cabinets;
    }

    // return filtered cabinets
    return filteredCabinets;
  }

  public storePermissions(permissions: any[]): void {
    // store all permissions in sessiont storage
    sessionStorage.setItem("allPermissions", JSON.stringify(permissions));
  }

  public getStoredPermissions(): any[] {
    // get stored all permissions from session storage
    const allPermissions = JSON.parse(sessionStorage.getItem("allPermissions"));

    // return all permissions
    return allPermissions;
  }

  public hasCabinetPermission(
    permissions: any[],
    permissionKey: string
  ): boolean {
    // if user is super admin allow => return true
    if (this.isSuperAdmin()) {
      return true;
    }

    // get permissions from session storage
    const allPermissions: any[] = this.getStoredPermissions();

    // find permission with key
    const permission: any = allPermissions.find(
      (per) => per.Key === permissionKey
    );

    // if permission available
    if (permission && permissions) {
      // return true if permission id is included in given permissions
      return permissions.includes(permission.Id);
    }
  }

  public hasFolderPermission(
    permissions: any[],
    permissionKey: string
  ): boolean {
    // if user is super admin allow => return true
    if (this.isSuperAdmin()) {
      return true;
    }

    // get permissions from session storage
    const allPermissions: any[] = this.getStoredPermissions();

    if (!allPermissions) {
      return false;
    }

    // find permission with key
    const permission: any = allPermissions.find(
      (per) => per.Key === permissionKey
    );

    // if permission available
    if (permission && permissions) {
      // return true if permission id is included in given permissions
      return permissions.includes(permission.Id);
    }
  }

  public getPermissionById(id: string) {
    // get all permissions from session storage
    const allPermissions: any[] = this.getStoredPermissions();

    // get single permission with Id
    const permission: any = allPermissions.find((per) => per.Id === id);

    // return permission
    return permission;
  }

  public getSystemLanguage() {
    return this.http.get(this.apiService.get("getSystemLanguage"));
  }
}
