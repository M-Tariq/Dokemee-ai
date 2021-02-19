import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../../models';
import { CompanyService } from '../../services';


@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent {
  public materialTableData$: Observable<Manager[]>
  
  constructor(private service: CompanyService) {
    this.materialTableData$ = service.loadMaterialTableData();
  }
}
