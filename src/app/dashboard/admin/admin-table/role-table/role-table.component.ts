import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {Role} from './models/role';
import {EntityBranchTableDeleteDialogComponent} from '../entity-branch-table/dialogs/delete/entity-branch-table-delete-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private proceedClickFlag = false;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {
  }

  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
  private onDestroySubject = new Subject<void>();
  displayedColumns = ['id', 'roleName', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  entityBranchData: Role;
  pIdFormControl = new FormControl('', [
    Validators.required
  ]);
  newEntryFlag = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  selectedEntity: any;
  selectedUserOrRole: any;
  selectedUserOrRoleName: any;
  userOrRoleNameList = [];
  selectUserOrRoleDetails = [];

  static initializeData() {
    return {
      roleId: null,
      roleName: null,
      hotelPOSModule: null,
      inventoryModule: null,
      roomBookModule: null,
      SuperMarketPOSModule: null,
      reportsModule: null,
      accountingModule: null
    };
  }

  ngOnInit() {
    this.selectUserOrRoleDetails = [
      {
        name: 'User',
        list: [
          'Soumya', 'Abdul', 'Aaron', 'Ram'
        ]
      },
      {
        name: 'Role',
        list: [
          'Admin', 'Store Keeper', 'Inventory Manager'
        ]
      }
    ];
    this.entityBranchData = RoleTableComponent.initializeData();
    this.loadData();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    this.id = undefined;
    this.newEntryFlag = true;
    this.entityBranchData = RoleTableComponent.initializeData();
  }

  startEdit(i: number, row) {
    this.newEntryFlag = true;
    this.id = row.entityId;
    console.log(row);
    this.entityBranchData = row;
    this.index = i;
    console.log(this.index);
  }

  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.entityId;
    const dialogRef = this.dialog.open(EntityBranchTableDeleteDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.roleId === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
    // .debounceTime(150)
    // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  onSave() {
    console.log(typeof this.id === 'undefined');
    if (typeof this.id === 'undefined') {
      this.dataService.addIssue(this.entityBranchData);
      this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
    } else {
      this.dataService.updateIssue(this.entityBranchData);
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.roleId === this.id);
      this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
      this.id = undefined;
    }
    this.refreshTable();
    this.newEntryFlag = false;
  }

  onCancel() {
    this.newEntryFlag = false;
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  UserOrRoleChangeAction(education: any) {
    this.selectedUserOrRoleName = '';
    const dropDownData = this.selectUserOrRoleDetails.find((data: any) => data.name === education);
    if (dropDownData) {
      this.userOrRoleNameList = dropDownData.list;
    } else {
      this.userOrRoleNameList = [];
    }
  }

  proceed() {
    this.proceedClickFlag = true;
    // this.selectedModules = [];
    // this.clonedModules.forEach(event => {
    //   event.selected = false;
    // });
    // if (typeof this.timerComponent.confirmedTube !== 'undefined' && this.timerComponent.confirmedTube.length > 0) {
    //   this.timerComponent.confirmedTube.forEach((value) => {
    //     this.clonedModules.forEach((event) => {
    //       if (event.name === value) {
    //         event.selected = true;
    //       }
    //     });
    //   });
    //   this.selectedModules = this.clonedModules.filter(event => {
    //     return event.selected === true;
    //   });
    //   this.roleTableFlag = true;
    // } else {
    //   this.roleTableFlag = false;
    // }
  }

  reset() {
    this.proceedClickFlag = false;
  }
}

export class ExampleDataSource extends DataSource<Role> {
  filterChangeSubject = new BehaviorSubject('');

  get filter(): string {
    return this.filterChangeSubject.value;
  }

  set filter(filter: string) {
    this.filterChangeSubject.next(filter);
  }

  filteredData: Role[] = [];
  renderedData: Role[] = [];

  constructor(public exampleDatabase: DataService,
              public mPaginator: MatPaginator,
              public mSort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChangeSubject.subscribe(() => this.mPaginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the entityBranchData to render. */
  connect(): Observable<Role[]> {
    // Listen for any changes in the base entityBranchData, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.mSort.sortChange,
      this.filterChangeSubject,
      this.mPaginator.page
    ];

    this.exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map(() => {
        // Filter entityBranchData
        this.filteredData = this.exampleDatabase.data.slice().filter((issue: Role) => {
          const searchStr = (issue.roleName) ?
            (issue.roleName).toLowerCase() : '';
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered entityBranchData
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted entityBranchData.
        const startIndex = this.mPaginator.pageIndex * this.mPaginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this.mPaginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {
  }

  sortData(data: Role[]): Role[] {
    if (!this.mSort.active || this.mSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.mSort.active) {
        case 'roleName':
          [propertyA, propertyB] = [a.roleName, b.roleName];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.mSort.direction === 'asc' ? 1 : -1);
    });
  }
}
