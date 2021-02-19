import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Manager,Users} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  public loadMaterialTableData(): Observable<Manager[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send'
      }
    ]);
  }
  public loadUserMaterialTableData(): Observable<Users[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send'
      }]);
  }
}
