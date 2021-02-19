import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../consts/routes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'dockme-connections-form',
  templateUrl: './connections-form.component.html',
  styleUrls: ['./connections-form.component.scss']
})
export class ConnectionsFormComponent implements OnInit {
  public form: FormGroup;
  public routes: typeof routes = routes;
  constructor() { }
  ngOnInit(): void {
  }

}
