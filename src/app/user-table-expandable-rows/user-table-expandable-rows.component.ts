import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../dashboard/admin/admin-table/user-table/models/user';

@Component({
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
  displayedModules: string[] = ['userId', 'userName'];
  displayedSubModules: string[] = ['branchId', 'branchName', 'branchRole', 'actions'];
  expandedElement: User | null;
  newEntryFlag: any;

  startEdit(param: any, row: any) {

  }

  deleteItem(i: any, row: any) {

  }
}
