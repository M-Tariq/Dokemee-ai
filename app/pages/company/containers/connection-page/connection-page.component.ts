import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services';
import { Connections } from '../../models/connections';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-connection-page',
  templateUrl: './connection-page.component.html',
  styleUrls: ['./connection-page.component.scss']
})
export class ConnectionPageComponent implements OnInit {
  public materialTableData$: Observable<Connections[]>

  constructor(private service: CompanyService) {
    this.materialTableData$ = service.loadMaterialTableData();
  }
  ngOnInit(): void {
  }

}
