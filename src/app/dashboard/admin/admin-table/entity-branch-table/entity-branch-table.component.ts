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
import {EntityBranchTableDeleteDialogComponent} from './dialogs/delete/entity-branch-table-delete-dialog.component';
import {EntityBranch} from './models/entity-branch';
import {FormControl, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-branch-table',
  templateUrl: './entity-branch-table.component.html',
  styleUrls: ['./entity-branch-table.component.scss']
})
export class EntityBranchTableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {
  }

  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
  private onDestroySubject = new Subject<void>();
  displayedColumns = ['id', 'entityId', 'entityName', 'entityCategory', 'entityDescription', 'entityImageUrl', 'entityStatus', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  entityBranchData: EntityBranch;
  pIdFormControl = new FormControl('', [
    Validators.required
  ]);
  newEntryFlag = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  static initializeData() {
    return {
      entityBranchId: null,
      entityBranchName: null,
      entityBranchShortName: null,
      entityBranchCategory: null,
      entityBranchStatus: null,
      entityBranchDescription: null,
      entityBranchImageUrl: null,
      entityBranchAddLine1: null,
      entityBranchAddLine2: null,
      entityBranchCity: null,
      entityBranchState: null,
      entityBranchCountry: null,
      entityBranchPinCode: null,
      entityBranchPhone: null,
      entityBranchFax: null,
      entityBranchMobile: null,
      entityBranchWebsite: null,
      entityBranchEmail: null,
      entityBranchStartDate: null
    };
  }

  ngOnInit() {
    this.entityBranchData = EntityBranchTableComponent.initializeData();
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
    this.entityBranchData = EntityBranchTableComponent.initializeData();
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
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityBranchId === this.id);
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
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityBranchId === this.id);
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
}

export class ExampleDataSource extends DataSource<EntityBranch> {
  filterChangeSubject = new BehaviorSubject('');

  get filter(): string {
    return this.filterChangeSubject.value;
  }

  set filter(filter: string) {
    this.filterChangeSubject.next(filter);
  }

  filteredData: EntityBranch[] = [];
  renderedData: EntityBranch[] = [];

  constructor(public exampleDatabase: DataService,
              public mPaginator: MatPaginator,
              public mSort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChangeSubject.subscribe(() => this.mPaginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the entityBranchData to render. */
  connect(): Observable<EntityBranch[]> {
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
        this.filteredData = this.exampleDatabase.data.slice().filter((issue: EntityBranch) => {
          const searchStr = (issue.entityBranchId + issue.entityBranchName + issue.entityBranchCategory) ?
            (issue.entityBranchId + issue.entityBranchName + issue.entityBranchCategory).toLowerCase() : '';
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

  /** Returns a sorted copy of the database entityBranchData. */
  sortData(data: EntityBranch[]): EntityBranch[] {
    if (!this.mSort.active || this.mSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.mSort.active) {
        // case 'id':
        //   [propertyA, propertyB] = [a.id, b.id];
        //   break;
        case 'entityBranchId':
          [propertyA, propertyB] = [a.entityBranchId, b.entityBranchId];
          break;
        case 'entityBranchName':
          [propertyA, propertyB] = [a.entityBranchName, b.entityBranchName];
          break;
        case 'entityBranchCategory':
          [propertyA, propertyB] = [a.entityBranchCategory, b.entityBranchCategory];
          break;
        case 'entityBranchStatus':
          [propertyA, propertyB] = [a.entityBranchStatus, b.entityBranchStatus];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.mSort.direction === 'asc' ? 1 : -1);
    });
  }
}
