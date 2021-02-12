import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from '../../services';
import { Manager, Users } from '../../models';

@Component({
  selector: 'admin-company-manager-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  selected = 'title';
  public materialTableData$: Observable<Manager[]>
  public materialUserTableData$: Observable<Users[]>
  public ElementSwitch: boolean = false;

  EditMenueSwitch($event) {
    if ($event.index == 1) {
      this.ElementSwitch = true;
    }
    else{
      this.ElementSwitch = false;
    }
  }

  constructor(private service: CompanyService) {
    this.materialTableData$ = service.loadMaterialTableData();
    this.materialUserTableData$ = service.loadUserMaterialTableData();
  }
}
