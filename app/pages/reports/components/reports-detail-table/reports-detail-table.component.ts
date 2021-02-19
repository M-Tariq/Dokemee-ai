import { Component, Input, OnInit } from '@angular/core';
import {Reports} from '../../models';

@Component({
  selector: 'app-reports-detail-table',
  templateUrl: './reports-detail-table.component.html',
  styleUrls: ['./reports-detail-table.component.scss']
})
export class ReportsDetailTableComponent implements OnInit {
  @Input() materialTableDate: Reports[];
  public dataSource: Reports[];

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
  }
}
