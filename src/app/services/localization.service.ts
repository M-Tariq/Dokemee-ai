import { Injectable } from "@angular/core";
import { DateAdapter, MatSnackBar } from '@angular/material';
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: "root"
})
export class LocalizationService {

  // all languages
  private languages: string[] = ["en", "es", "fr"];

  // default language
  private defaultLang: string = "en";

  public languageChanged = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private dateAdapter: DateAdapter<any>,
    private snackbar: MatSnackBar,
    public translate: TranslateService) {
    this.init();
  }

  public init(): void {
    this.getLanguages().subscribe((response) => {

      // add all required languages
      this.translate.addLangs(response);

      // set a language as default
      this.translate.setDefaultLang(this.defaultLang);
      // // this.translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
    });
  }

  public use(language: string): Observable<any> {
    // set current selected language
    this.dateAdapter.setLocale(language);
    return this.translate.use(language);
  }

  public async getValue(key: string): Promise<string> {
    // get value from translation file from give key
    return this.translate.get(key).toPromise();
  }

  public getLanguages(): Observable<any> {
    return this.http.get(this.apiService.get("getLanguages"));
  }

  public setLanguage(selectedLanguage: string): Observable<any> {
    const user: any = this.authService.getCurrentUser();

    let url = this.apiService.get("setLanguage");
    url = url.replace('{userId}', user.Id);

    return this.http.put(url, { LangCode: selectedLanguage });
  }
}
