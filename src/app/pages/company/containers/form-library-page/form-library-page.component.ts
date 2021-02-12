import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services';
import { Mapping } from '../../models/mapping';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-library-page',
  templateUrl: './form-library-page.component.html',
  styleUrls: ['./form-library-page.component.scss']
})
export class FormLibraryPageComponent implements OnInit {

  public materialTableData$: Observable<Mapping[]>

  constructor(private service: CompanyService) {
    this.materialTableData$ = service.loadMappingTableData();
  }

  ngOnInit(): void {
  }

}
