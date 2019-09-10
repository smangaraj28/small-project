import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from './models/user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  newEntryFlag = false;
  userDataSource: User[];
  userName: any;
  userPassword: any;

  constructor(public dialog: MatDialog) {
  }

  addNew() {
    this.newEntryFlag = true;
  }

  ngOnInit(): void {
    this.userDataSource = [
      {
        userId: 1,
        userName: 'Soumya',
        userPassword: 'soumya',
        branchRole: [{
          branchId: 1,
          branchName: 'A1',
          branchRole: 'Admin'
        },
          {
            branchId: 2,
            branchName: 'A2',
            branchRole: 'Store Keeper'
          }]
      },
      {
        userId: 2,
        userName: 'Natarayan',
        userPassword: 'nattarayan',
        branchRole: [{
          branchId: 1,
          branchName: 'B1',
          branchRole: 'Admin'
        }]
      },
      {
        userId: 1,
        userName: 'Subhendu',
        userPassword: 'subhendu',
        branchRole: [{
          branchId: 1,
          branchName: 'C1',
          branchRole: 'Store'
        }]
      }
    ];
  }

  onStartEditClicked(event) {
    console.log(event);
    this.newEntryFlag = true;
  }

  onSave() {
    this.newEntryFlag = false;
  }

  onCancel() {
    this.newEntryFlag = false;
  }
}
