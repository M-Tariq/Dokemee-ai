import { Component, Input, OnInit } from '@angular/core';
import { Manager } from '../../models';
import { routes } from '../../../../consts/routes';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyManager } from '../../models/company.manager.model';

@Component({
  selector: 'manager-table',
  templateUrl: './manager-table.component.html',
  styleUrls: ['./manager-table.component.scss']
})
export class ManagerTableComponent implements OnInit {
  @Input() materialTableDate: Manager[];
  public dataSource: Manager[]=new Array;
  public routes: typeof routes = routes;
  params:any;
  public companyManagers: CompanyManager[]=new Array();
  constructor(private companyService: CompanyService) { }

  public ngOnInit() {
    // alert("manager")
    this.dataSource = this.materialTableDate;
    this.params = {PageSize: 10, PageNo:1}
    this.companyService.getCompaniesFilter(this.params).subscribe((res) => {
      this.companyManagers=res.Items;
      // alert("Sucess")
    }, (error)=>{
      console.log(error);
      alert("error")
    })
  }
}
