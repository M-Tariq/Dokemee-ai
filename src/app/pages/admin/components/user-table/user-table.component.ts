import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../models';
import { routes } from '../../../../consts/routes';

@Component({
  selector: 'admin-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() materialUserTableData: Users[];
  public dataSource: Users[];
  public routes: typeof routes = routes;

  public ngOnInit() {
    this.dataSource = this.materialUserTableData;
  }
  constructor() { }
}
