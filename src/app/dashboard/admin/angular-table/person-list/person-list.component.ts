import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import {PersonValidatorService} from './person-validator.service';
import {Person} from './person';
import {TableDataSource} from '../table-data-source';
import {ValidatorService} from '../validator.service';

@Component({
  selector: 'app-person-list',
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorService}
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private personValidator: ValidatorService) {
  }

  displayedColumns = ['id', 'name', 'address', 'email', 'contact', 'registerno', 'status', 'actionsColumn'];

  @Input() personList = [];
  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: TableDataSource<Person>;


  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);

    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
  }
}
