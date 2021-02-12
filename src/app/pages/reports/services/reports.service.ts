import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Reports,ReportsHead} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  public loadReportsHeadTableData(): Observable<ReportsHead[]> {
    return of([
      {
        companyname: 'Company 1',
        companyId: '45454545',
        exp_date: '04/20/2021',
        exp_days: '25',
        cabnit: '04',
        doc_remaining: '10 of 200',
        doc_processed: '190',
        index_available: '10'
      },
    ]);
  }
  
  public loadReportsDetailTableData(): Observable<Reports[]> {
    return of([
      {
        title: 'HR',
        mapped_index: '05',
        docs_processed: '45'

      },
      {
        title: 'Derek Cabinet',
        mapped_index: '08',
        docs_processed: '50'

      },
      {
        title: 'Cabinet 123',
        mapped_index: '10',
        docs_processed: '45'
      },
      {
        title: 'Cabinet 456',
        mapped_index: '11',
        docs_processed: '85'
      },
    ]);
  }
}
