import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from './models/user';
import {DragDropDualListComponent} from '../../../../drag-drop-dual-list/drag-drop-dual-list.component';

export interface BranchRoleTable {
  branchName: string;
  branchRole: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(DragDropDualListComponent, {static: false})
  private dragDropDualListComponent: DragDropDualListComponent;
  newEntryFlag = false;
  userDataSource: User[];
  userName: any;
  userPassword: any;
  proceedClickFlag = false;
  userTableFlag = false;
  availableBranchName = [];
  displayedColumns: string[] = ['branchName', 'branchRole'];
  rightTitleDragDrop = 'Available Branches';
  leftTitleDragDrop = 'Selected Branches';
  branchRoleTable: BranchRoleTable[] = [];
  entityName: string;
  subCardLabel: string;
  selectedBranchName = [];
  roleList = [];

  constructor(public dialog: MatDialog) {
  }

  static intializeBranchName() {
    return [
      'Branch 1',
      'Branch 2',
      'Branch 3',
      'Branch 4',
      'Branch 5',
      'Branch 6',
      'Branch 7'
    ];
  }

  static intializeRoleName() {
    return [
      'Role 1',
      'Role 2',
      'Role 3',
      'Role 4'
    ];
  }

  addNew() {
    this.newEntryFlag = true;
    this.subCardLabel = 'Add';
  }

  ngOnInit(): void {
    this.userDataSource = [
      {
        userId: 1,
        userName: 'Soumya',
        userPassword: 'soumya',
        branchRole: [{
          branchId: 1,
          branchName: 'Branch 4',
          branchRole: 'Role 1'
        },
          {
            branchId: 2,
            branchName: 'Branch 3',
            branchRole: 'Role 2'
          }]
      },
      {
        userId: 2,
        userName: 'Natarayan',
        userPassword: 'nattarayan',
        branchRole: [{
          branchId: 1,
          branchName: 'Branch 7',
          branchRole: 'Role 3'
        }]
      },
      {
        userId: 1,
        userName: 'Subhendu',
        userPassword: 'subhendu',
        branchRole: [{
          branchId: 1,
          branchName: 'Branch 2',
          branchRole: 'Role 4'
        }]
      }
    ];
    this.availableBranchName = UserTableComponent.intializeBranchName();
    this.roleList = UserTableComponent.intializeRoleName();
  }

  arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  onStartEditClicked(event) {
    this.userTableFlag = true;
    this.subCardLabel = 'Edit';
    console.log(event);
    this.branchRoleTable = [];
    this.userName = event.allRows.userName;
    this.userPassword = event.allRows.userPassword;
    this.selectedBranchName = event.allRows.branchRole.map(value => {
      const obj = {branchName: value.branchName, branchRole: value.branchRole};
      this.branchRoleTable.push(obj);
      this.availableBranchName = this.arrayRemove(this.availableBranchName, value.branchName);
      return value.branchName;
    });
    console.log(this.selectedBranchName);
    console.log(this.availableBranchName);
    this.newEntryFlag = true;
  }

  onSave() {
    this.newEntryFlag = false;
    console.log(this.branchRoleTable);
  }

  onCancel() {
    this.newEntryFlag = false;
    this.availableBranchName = UserTableComponent.intializeBranchName();
    this.selectedBranchName = [];
  }

  proceed() {
    this.proceedClickFlag = true;
    this.branchRoleTable = [];
    if (typeof this.dragDropDualListComponent.selectedModuleName !== 'undefined' &&
      this.dragDropDualListComponent.selectedModuleName.length > 0) {
      this.dragDropDualListComponent.selectedModuleName.forEach(value => {
        this.branchRoleTable.push({
          branchName: value,
          branchRole: null
        });
      });
      this.userTableFlag = true;
    } else {
      this.userTableFlag = false;
    }
  }

  reset() {
    this.proceedClickFlag = false;
    this.userTableFlag = false;
  }
}
