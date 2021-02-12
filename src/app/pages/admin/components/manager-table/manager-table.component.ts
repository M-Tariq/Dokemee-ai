import { Component, Input, OnInit } from '@angular/core';
import { Manager } from '../../models';
import { routes } from '../../../../consts/routes';

@Component({
  selector: 'manager-table',
  templateUrl: './manager-table.component.html',
  styleUrls: ['./manager-table.component.scss']
})
export class ManagerTableComponent implements OnInit {
  @Input() materialTableDate: Manager[];
  public dataSource: Manager[];
  public routes: typeof routes = routes;
  constructor() { }

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
  }

}
