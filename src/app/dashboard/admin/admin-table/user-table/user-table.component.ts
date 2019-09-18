import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BranchRole, User} from './models/user';
import {DragDropDualListComponent} from '../drag-drop-dual-list/drag-drop-dual-list.component';
import {UserTableExpandableRowsComponent} from './user-table-expandable-rows/user-table-expandable-rows.component';
import {MatSelectChange} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {UserTableDeleteDialogComponent} from './dialogs/delete/user-table-delete-dialog.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild(DragDropDualListComponent, {static: false}) private dragDropDualListComponent: DragDropDualListComponent;
  @ViewChild(UserTableExpandableRowsComponent, {static: false}) public userTableExpandableRowsComponent: UserTableExpandableRowsComponent;
  entityLists = ['E1', 'E2'];
  displayedColumns: string[] = ['branchName', 'branchRole'];
  clonedUserDataSource: User[];
  userDataSource: User[];
  branchRoleTable: BranchRole[] = [];
  rightTitleDragDrop = 'Selected Branches';
  leftTitleDragDrop = 'Available Branches';
  availableBranchName = [];
  selectedBranchName = [];
  roleList = [];
  newEntryFlag = false;
  userName: any;
  userPassword: any;
  proceedClickFlag = false;
  userTableFlag = false;
  entityName: string;
  subCardLabel: string;
  selectedEntity: any;
  userId: any;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private cd: ChangeDetectorRef) {
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

  addNew() {
    this.proceedClickFlag = false;
    this.newEntryFlag = true;
    this.userTableFlag = false;
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
    const resolvedUserData = this.activatedRoute.snapshot.data.resolvedUserData;
    console.log('Resolved User Data', resolvedUserData);
    this.userDataSource = resolvedUserData;
    this.clonedUserDataSource = resolvedUserData;
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
    this.userId = event.allRows.userId;
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
    let i = 100;
    switch (this.subCardLabel) {
      case 'Add':
        obj = {
          userId: i,
          entityName: this.entityName,
          userName: this.userName,
          userPassword: this.userPassword,
          branchRole: this.branchRoleTable
        };
        this.userDataSource.push(obj);
        this.clonedUserDataSource = [...this.userDataSource];
        i = i + 1;
        break;
      case 'Edit':
        obj = {
          userId: this.userId,
          entityName: this.entityName,
          userName: this.userName,
          userPassword: this.userPassword,
          branchRole: this.branchRoleTable
        };
        const foundIndex = this.userDataSource.findIndex(x => x.userId === this.userId);
        this.userDataSource[foundIndex] = obj;
        this.clonedUserDataSource = [...this.userDataSource];
        break;
    }
    console.log(this.clonedUserDataSource);
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

  entitySelectionChange($event: MatSelectChange) {
    if ($event.value !== 'ALL') {
      this.clonedUserDataSource = this.userDataSource.filter(value => {
        return value.entityName === $event.value;
      });
    } else {
      this.clonedUserDataSource = this.userDataSource;
    }
    // console.log(this.clonedUserDataSource);
  }

  onStartFilterClicked($event: any) {
    this.clonedUserDataSource = this.userDataSource.slice().filter((value: User) => {
      const searchStr = (value.userName) ?
        (value.userName).toLowerCase() : '';
      return searchStr.indexOf($event.toLowerCase()) !== -1;
    });
  }

  onStartDeleteClicked(row: any) {
    console.log(row);
    this.userId = row.userId;
    const dialogRef = this.dialog.open(UserTableDeleteDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDataSource.findIndex(x => x.userId === this.userId);
        this.userDataSource.splice(foundIndex, 1);
        this.clonedUserDataSource = [...this.userDataSource];
        this.cd.detectChanges();
        // this.refreshTable();
      }
    });
  }

}
