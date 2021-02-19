import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Manager } from '../../models';
import { routes } from '../../../../consts/routes';
import { CompanyService } from 'src/app/services/company.service';
// import { CompanyService } from 'src/app/services/';

@Component({
  selector: 'manager-table',
  templateUrl: './manager-table.component.html',
  styleUrls: ['./manager-table.component.scss']
})
export class ManagerTableComponent implements OnInit {
  @Input() materialTableDate: Manager[];
  public dataSource: Manager[];
  public routes: typeof routes = routes;

  constructor(public dialog: MatDialog, private companyService: CompanyService) { }

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompanyDetailDialog, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'company-detail-dialog',
  templateUrl: './company-detail-dialog.html',
  styleUrls: ['./company-detail-dialog.component.scss']
})

export class CompanyDetailDialog { }