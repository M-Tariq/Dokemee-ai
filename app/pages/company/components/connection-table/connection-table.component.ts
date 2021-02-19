import { Component, Input, OnInit } from '@angular/core';
import { Manager } from '../../models';
import { routes } from '../../../../consts/routes';

@Component({
  selector: 'connection-table',
  templateUrl: './connection-table.component.html',
  styleUrls: ['./connection-table.component.scss']
})
export class ConnectionTableComponent implements OnInit {
  @Input() materialTableDate: Manager[];
  public dataSource: Manager[];
  public routes: typeof routes = routes;

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
  }
  constructor() { }

}
