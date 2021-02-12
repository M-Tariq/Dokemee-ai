import {Component, OnInit , Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Mapping } from '../../models';
import { routes } from '../../../../consts/routes';

export interface User {
  name: string;
}
@Component({
  selector: 'dockmee-mapping-table',
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.scss']
})

export class MappingTableComponent implements OnInit {
  selected = 'title';
  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];

  filteredOptions: Observable<User[]>;

  @Input() materialTableDate: Mapping[];

  public dataSource: Mapping[];
  public routes: typeof routes = routes;
  constructor() { }

  public ngOnInit() {
    this.dataSource = this.materialTableDate;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
