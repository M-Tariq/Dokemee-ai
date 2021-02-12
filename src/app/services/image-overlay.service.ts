import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageOverlayService {

  constructor(private http: HttpService,
    private apiService: ApiService) { }

  public uploadImageOverlayFormImage(formData: FormData, cabinetId: string): Observable<any> {
    let url = this.apiService.get("uploadImageOverlayFormImage");
    url = url.replace('{cabinetId}', cabinetId);

    // send APi call to upload image for image overlay form
    return this.http.post(url, formData, {
      skipContentType: "true",
    });
  }

  public createImageOverlayForm(form: any): Observable<any> {
    return this.http.post(this.apiService.get('createImageOverlayForm'), form);
  }
}
