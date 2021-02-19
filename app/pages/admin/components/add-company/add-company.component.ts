import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyManager } from '../../models/company.manager.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  public api_error: string;
  public form: FormGroup = new FormGroup({});
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.minLength(3)]),
      Description: new FormControl('', [Validators.minLength(3)]),
      Contact: new FormControl('', [Validators.minLength(3)]),
      Email: new FormControl('', [Validators.email]),
      DocumentsLimit: new FormControl('', []),
      ExpirationDate: new FormControl('', []),
    });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    let manager: CompanyManager = new CompanyManager();
    manager = this.form.value;
    manager.Address = "default";

    this.companyService.AddCompany(this.form.value).subscribe((res) => {
      this.api_error = "";
      console.log(res);
    }, (error) => {
      this.api_error = error.error.Message;
      console.log(error);
    })
  }
  
}
