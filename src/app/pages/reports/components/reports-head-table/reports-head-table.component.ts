import { Component, Input, OnInit } from '@angular/core';
import {ReportsHead } from '../../models';

@Component({
  selector: 'app-reports-head-table',
  templateUrl: './reports-head-table.component.html',
  styleUrls: ['./reports-head-table.component.scss']
})
export class ReportsTableComponent implements OnInit {
  @Input() materialTableDate: ReportsHead[];
  public dataSource: ReportsHead[];
  
  public ngOnInit() {
    this.dataSource = this.materialTableDate;
  }
}
