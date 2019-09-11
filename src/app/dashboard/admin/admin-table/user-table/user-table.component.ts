import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BranchRole, User} from './models/user';
import {DragDropDualListComponent} from '../../../../drag-drop-dual-list/drag-drop-dual-list.component';
import {UserTableExpandableRowsComponent} from '../../../../user-table-expandable-rows/user-table-expandable-rows.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(DragDropDualListComponent, {static: false})
  private dragDropDualListComponent: DragDropDualListComponent;
  @ViewChild(UserTableExpandableRowsComponent, {static: false})
  public userTableExpandableRowsComponent: UserTableExpandableRowsComponent;
  newEntryFlag = false;
  userDataSource: User[];
  userName: any;
  userPassword: any;
  proceedClickFlag = false;
  userTableFlag = false;
  availableBranchName = [];
  displayedColumns: string[] = ['branchName', 'branchRole'];
  rightTitleDragDrop = 'Selected Branches';
  leftTitleDragDrop = 'Available Branches';
  branchRoleTable: BranchRole[] = [];
  entityName: string;
  subCardLabel: string;
  selectedBranchName = [];
  roleList = [];
  entityLists = ['E1', 'E2'];
  selectedEntity: any;
  private userDataSourceSingle: BranchRole;

  constructor(public dialog: MatDialog) {
  }

  static initializeBranchName() {
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

  static initializeRoleName() {
    return [
      'Role 1',
      'Role 2',
      'Role 3',
      'Role 4'
    ];
  }

  // static initializeUserDate() {
  //   return {
  //     userId: null,
  //     userName: null,
  //     userPassword: null,
  //     branchRole: null
  //   };
  // }

  addNew() {
    this.newEntryFlag = true;
    this.userTableFlag = false;
    // this.proceedClickFlag = false;
    this.subCardLabel = 'Add';
    this.branchRoleTable = [];
    this.entityName = null;
    this.userName = null;
    this.userPassword = null;
    this.availableBranchName = UserTableComponent.initializeBranchName();
    this.selectedBranchName = [];
    this.roleList = UserTableComponent.initializeRoleName();
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
        userId: 3,
        userName: 'Subhendu',
        userPassword: 'subhendu',
        branchRole: [{
          branchId: 1,
          branchName: 'Branch 2',
          branchRole: 'Role 4'
        }]
      }
    ];
    this.availableBranchName = UserTableComponent.initializeBranchName();
    this.roleList = UserTableComponent.initializeRoleName();
  }

  arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  onStartEditClicked(event) {
    this.newEntryFlag = false;
    this.userTableFlag = true;
    this.proceedClickFlag = true;
    this.subCardLabel = 'Edit';
    console.log(event);
    this.availableBranchName = UserTableComponent.initializeBranchName();
    this.branchRoleTable = [];
    this.userName = event.allRows.userName;
    this.userPassword = event.allRows.userPassword;
    this.selectedBranchName = event.allRows.branchRole.map(value => {
      const obj = {branchName: value.branchName, branchRole: value.branchRole};
      this.branchRoleTable.push(obj);
      this.availableBranchName = this.arrayRemove(this.availableBranchName, value.branchName);
      return value.branchName;
    });
    this.newEntryFlag = true;
  }

  onSave() {
    this.userTableExpandableRowsComponent.newEntryFlag = false;
    this.newEntryFlag = false;
    let obj: User;
    switch (this.subCardLabel) {
      case 'Add':
        console.log('add');
        obj = {
          entityName: this.entityName,
          userName: this.userName,
          userPassword: this.userPassword,
          branchRole: this.branchRoleTable
        };
        break;
      case 'Edit':
        console.log('edit');
        obj = {
          entityName: this.entityName,
          userName: this.userName,
          userPassword: this.userPassword,
          branchRole: this.branchRoleTable
        };
        break;
    }
    console.log(obj);
  }

  onCancel() {
    this.userTableExpandableRowsComponent.newEntryFlag = false;
    this.newEntryFlag = false;
    this.availableBranchName = UserTableComponent.initializeBranchName();
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
