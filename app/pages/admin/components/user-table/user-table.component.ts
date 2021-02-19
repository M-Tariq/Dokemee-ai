import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../models';
import { routes } from '../../../../consts/routes';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/header/models/user.model';

@Component({
  selector: 'admin-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
  public userList: User[]=new Array;
  @Input() materialUserTableData: Users[];
  public dataSource: Users[];
  public routes: typeof routes = routes;

  params:any;

  constructor(private userService: UsersService) { }

  public ngOnInit() {
    this.dataSource = this.materialUserTableData;
    this.loadUserList();
  }

  loadUserList() {
    this.params = {PageSize: 10, PageNo:1}
    this.userService.getUsersFilter(this.params).subscribe((res) => {
      this.userList = res.Items;
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }
}
