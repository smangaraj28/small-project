import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../models/user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-table-expandable-rows',
  templateUrl: './user-table-expandable-rows.component.html',
  styleUrls: ['./user-table-expandable-rows.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserTableExpandableRowsComponent {

  @Input() moduleData: User[];
  @Output() startEditEmitter = new EventEmitter<any>();
  @Output() startDeleteEmitter = new EventEmitter<any>();
  @Output() startFilterEmitter = new EventEmitter<any>();
  displayedModules: string[] = ['userId', 'userName', 'actions'];
  displayedSubModules: string[] = ['branchId', 'branchName', 'branchRole', 'actions'];
  expandedElement: User | null;
  newEntryFlag = false;
  filterValue: any;

  constructor() {
  }

  startEdit(param: any, element: any, row: any) {
    this.newEntryFlag = true;
    const obj = {
      allRows: element,
      selectedRow: row
    };
    this.startEditEmitter.emit(obj);
  }

  deleteItem(i: any, row: any) {

  }

  deleteMainRow(i: any, row: any) {
    console.log(row);
    this.startDeleteEmitter.emit(row);
  }

  editMainRow(param: any, row: any) {
    this.newEntryFlag = true;
    const obj = {
      allRows: row,
      selectedRow: row
    };
    this.startEditEmitter.emit(obj);
  }


  filterValueChange($event: Event) {
    this.startFilterEmitter.emit(this.filterValue);
  }
}
