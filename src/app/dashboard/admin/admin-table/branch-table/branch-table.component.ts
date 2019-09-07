import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {BranchTableAddDialogComponent} from './dialogs/add/branch-table-add-dialog.component';
import {BranchTableEditDialogComponent} from './dialogs/edit/branch-table-edit-dialog.component';
import {BranchTableDeleteDialogComponent} from './dialogs/delete/branch-table-delete-dialog.component';
import {Entity} from './models/entity';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-store-inventory',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.scss']
})
export class BranchTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  displayedColumns = ['id', 'entityId', 'entityName', 'entityCategory', 'entityDescription', 'entityImageUrl', 'entityStatus', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  data: Entity = [];
  pIdFormControl = new FormControl('', [
    Validators.required
  ]);
  deptIdFormControl = new FormControl('', [
    Validators.required
  ]);
  pCategoryFormControl = new FormControl('', [
    Validators.required
  ]);
  pQuantityFormControl = new FormControl('', [
    Validators.required
  ]);
  pPriceFormControl = new FormControl('', [
    Validators.required
  ]);
  pNameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Entity) {
    console.log(issue);
    const dialogRef = this.dialog.open(BranchTableAddDialogComponent, {
      data: {issue: issue}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, eid: string, ename: string, ecategory: string, edescr: string, eimage: string, estatus: string) {
    this.id = eid;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(BranchTableEditDialogComponent, {
      data: {
        entityId: eid,
        entityName: ename,
        entityCategory: ecategory,
        entityDescription: edescr,
        entityImageUrl: eimage,
        entityStatus: estatus
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityId === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, eid: string, ename: string, ecategory: string, estatus: string) {
    this.index = i;
    this.id = eid;
    const dialogRef = this.dialog.open(BranchTableDeleteDialogComponent, {
      data: {
        entityId: eid,
        entityName: ename,
        entityCategory: ecategory,
        entityStatus: estatus
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityId === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new DataService();
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

  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
}

export class ExampleDataSource extends DataSource<Entity> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Entity[] = [];
  renderedData: Entity[] = [];

  constructor(public exampleDatabase: DataService,
              public mPaginator: MatPaginator,
              public mSort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this.mPaginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Entity[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.mSort.sortChange,
      this._filterChange,
      this.mPaginator.page
    ];

    this.exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data.slice().filter((issue: Entity) => {
          const searchStr = (issue.entityId + issue.entityName + issue.entityCategory) ?
            (issue.entityId + issue.entityName + issue.entityCategory).toLowerCase() : '';
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.mPaginator.pageIndex * this.mPaginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this.mPaginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Entity[]): Entity[] {
    if (!this.mSort.active || this.mSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.mSort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'entityId':
          [propertyA, propertyB] = [a.entityId, b.entityId];
          break;
        case 'entityName':
          [propertyA, propertyB] = [a.entityName, b.entityName];
          break;
        case 'entityCategory':
          [propertyA, propertyB] = [a.entityCategory, b.entityCategory];
          break;
        case 'entityStatus':
          [propertyA, propertyB] = [a.entityStatus, b.entityStatus];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.mSort.direction === 'asc' ? 1 : -1);
    });
  }
}
