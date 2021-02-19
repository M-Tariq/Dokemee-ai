import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportsService } from '../../services';
import { ReportsHead,Reports } from '../../models';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent {
  selected = 'title';
  panelOpenState = false;
  public loadReportsHeadTableData$: Observable<ReportsHead[]>
  public loadReportsDetailTableData$: Observable<Reports[]>
  public documentSwitch:boolean = false;

  constructor(private service: ReportsService) {
    this.loadReportsHeadTableData$ = service.loadReportsHeadTableData();
    this.loadReportsDetailTableData$ = service.loadReportsDetailTableData();
  }
}
