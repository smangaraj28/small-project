import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';
import {EntityBranchTableDeleteDialogComponent} from './dialogs/delete/entity-branch-table-delete-dialog.component';
import {EntityBranch} from './models/entity-branch';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-branch-table',
  templateUrl: './entity-branch-table.component.html',
  styleUrls: ['./entity-branch-table.component.scss']
})
export class EntityBranchTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  private onDestroySubject = new Subject<void>();
  entityLists = ['E1', 'E2'];
  displayedColumns = ['id', 'entityBranchName', 'entityBranchCity', 'entityBranchMobile', 'entityBranchStartDate',
    'entityBranchStatus', 'actions'];
  entityBranchDataSource: EntityBranch[];
  clonedEntityBranchDataSource: EntityBranch[];
  entityBranchData: EntityBranch;
  subCardLabel: string;
  entityBranchId: number;
  newEntryFlag = false;
  selectedEntity = 'ALL';
  filterValue: any;
  entityBranchForm: any;
  private i = 100;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  static initializeData() {
    return {
      entityName: null,
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
    this.entityBranchForm = new FormGroup({
      entityNameFormControl: new FormControl(),
      entityBranchIdFormControl: new FormControl(),
      entityBranchNameFormControl: new FormControl(),
      entityBranchShortNameFormControl: new FormControl(),
      entityBranchCategoryFormControl: new FormControl(),
      entityBranchStatusFormControl: new FormControl(),
      entityBranchDescriptionFormControl: new FormControl(),
      entityBranchImageUrlFormControl: new FormControl(),
      entityBranchAddLine1FormControl: new FormControl(),
      entityBranchAddLine2FormControl: new FormControl(),
      entityBranchCityFormControl: new FormControl(),
      entityBranchStateFormControl: new FormControl(),
      entityBranchCountryFormControl: new FormControl(),
      entityBranchPinCodeFormControl: new FormControl(),
      entityBranchPhoneFormControl: new FormControl(),
      entityBranchFaxFormControl: new FormControl(),
      entityBranchMobileFormControl: new FormControl(),
      entityBranchWebsiteFormControl: new FormControl(),
      entityBranchEmailFormControl: new FormControl(),
      entityBranchStartDateFormControl: new FormControl()
    });
    const resolvedEntityBranchData = this.activatedRoute.snapshot.data.resolvedEntityBranchData;
    console.log('Resolved Entity Branch Data', resolvedEntityBranchData);
    this.entityBranchDataSource = resolvedEntityBranchData;
    this.clonedEntityBranchDataSource = resolvedEntityBranchData;
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
    if (this.selectedEntity && this.selectedEntity !== 'ALL') {
      this.entityBranchData.entityName = this.selectedEntity;
      this.entityBranchForm.controls.entityNameFormControl.disable();
    }
    this.subCardLabel = 'Add';
    this.entityBranchId = undefined;
    this.newEntryFlag = true;
    const entityNameDemo = this.entityBranchData.entityName;
    this.entityBranchData = EntityBranchTableComponent.initializeData();
    this.entityBranchData.entityName = entityNameDemo;
  }

  startEdit(i: number, row) {
    this.entityBranchForm.controls.entityNameFormControl.disable();
    this.subCardLabel = 'Edit';
    this.newEntryFlag = true;
    this.entityBranchId = row.entityBranchId;
    this.entityBranchData = JSON.parse(JSON.stringify(row));
  }

  deleteItem(i: number, row) {
    this.entityBranchId = row.entityBranchId;
    const dialogRef = this.dialog.open(EntityBranchTableDeleteDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.entityBranchDataSource.findIndex(x => x.entityBranchId === this.entityBranchId);
        this.entityBranchDataSource.splice(foundIndex, 1);
        this.clonedEntityBranchDataSource = [...this.entityBranchDataSource];
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    // this.exampleDatabase = new DataService(this.httpClient);
    // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    // fromEvent(this.filter.nativeElement, 'keyup')
    // // .debounceTime(150)
    // // .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });
  }

  onSave() {
    // console.log(typeof this.entityBranchId === 'undefined');
    // if (typeof this.entityBranchId === 'undefined') {
    //   // this.dataService.addIssue(this.entityBranchData);
    //   // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
    // } else {
    //   // this.dataService.updateIssue(this.entityBranchData);
    //   // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityBranchId === this.id);
    //   // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
    //   this.entityBranchId = undefined;
    // }
    // this.refreshTable();
    this.newEntryFlag = false;
    this.entityBranchForm.controls.entityNameFormControl.enable();
    switch (this.subCardLabel) {
      case 'Add':
        this.entityBranchDataSource.push(this.entityBranchData);
        this.clonedEntityBranchDataSource = [...this.entityBranchDataSource];
        this.i = this.i + 1;
        break;
      case 'Edit':
        const foundIndex = this.entityBranchDataSource.findIndex(x => x.entityBranchId === this.entityBranchId);
        this.entityBranchDataSource[foundIndex] = {...this.entityBranchData};
        this.clonedEntityBranchDataSource = [...this.entityBranchDataSource];
        break;
    }
    console.log(this.clonedEntityBranchDataSource);
  }

  onCancel() {
    this.newEntryFlag = false;
    this.entityBranchData = EntityBranchTableComponent.initializeData();
    this.entityBranchForm.controls.entityNameFormControl.enable();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  entitySelectionChange($event: MatSelectChange) {
    if ($event.value !== 'ALL') {
      this.entityBranchData.entityName = $event.value;
      this.entityBranchForm.controls.entityNameFormControl.disable();
      this.clonedEntityBranchDataSource = this.entityBranchDataSource.filter(value => {
        return value.entityName === $event.value;
      });
    } else {
      this.entityBranchForm.controls.entityNameFormControl.enable();
      this.entityBranchData.entityName = null;
      this.clonedEntityBranchDataSource = this.entityBranchDataSource;
    }
  }

  filterValueChange($event: any) {
    this.clonedEntityBranchDataSource = this.entityBranchDataSource.slice().filter((value: EntityBranch) => {
      const searchStr = (value.entityBranchName) ?
        (value.entityBranchName).toLowerCase() : '';
      return searchStr.indexOf(this.filterValue.toLowerCase()) !== -1;
    });
  }
}

// export class ExampleDataSource extends DataSource<EntityBranch> {
//   filterChangeSubject = new BehaviorSubject('');
//
//   get filter(): string {
//     return this.filterChangeSubject.value;
//   }
//
//   set filter(filter: string) {
//     this.filterChangeSubject.next(filter);
//   }
//
//   filteredData: EntityBranch[] = [];
//   renderedData: EntityBranch[] = [];
//
//   constructor(public exampleDatabase: DataService,
//               public mPaginator: MatPaginator,
//               public mSort: MatSort) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChangeSubject.subscribe(() => this.mPaginator.pageIndex = 0);
//   }
//
//   /** Connect function called by the table to retrieve one stream containing the entityBranchData to render. */
//   connect(): Observable<EntityBranch[]> {
//     // Listen for any changes in the base entityBranchData, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this.exampleDatabase.dataChange,
//       this.mSort.sortChange,
//       this.filterChangeSubject,
//       this.mPaginator.page
//     ];
//
//     this.exampleDatabase.getAllIssues();
//
//
//     return merge(...displayDataChanges).pipe(map(() => {
//         // Filter entityBranchData
//         this.filteredData = this.exampleDatabase.data.slice().filter((issue: EntityBranch) => {
//           const searchStr = (issue.entityBranchId + issue.entityBranchName + issue.entityBranchCategory) ?
//             (issue.entityBranchId + issue.entityBranchName + issue.entityBranchCategory).toLowerCase() : '';
//           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//         });
//
//         // Sort filtered entityBranchData
//         const sortedData = this.sortData(this.filteredData.slice());
//
//         // Grab the page's slice of the filtered sorted entityBranchData.
//         const startIndex = this.mPaginator.pageIndex * this.mPaginator.pageSize;
//         this.renderedData = sortedData.splice(startIndex, this.mPaginator.pageSize);
//         return this.renderedData;
//       }
//     ));
//   }
//
//   disconnect() {
//   }
//
//   sortData(data: EntityBranch[]): EntityBranch[] {
//     if (!this.mSort.active || this.mSort.direction === '') {
//       return data;
//     }
//
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//
//       switch (this.mSort.active) {
//         // case 'id':
//         //   [propertyA, propertyB] = [a.id, b.id];
//         //   break;
//         case 'entityBranchId':
//           [propertyA, propertyB] = [a.entityBranchId, b.entityBranchId];
//           break;
//         case 'entityBranchName':
//           [propertyA, propertyB] = [a.entityBranchName, b.entityBranchName];
//           break;
//         case 'entityBranchCategory':
//           [propertyA, propertyB] = [a.entityBranchCategory, b.entityBranchCategory];
//           break;
//         case 'entityBranchStatus':
//           [propertyA, propertyB] = [a.entityBranchStatus, b.entityBranchStatus];
//           break;
//       }
//
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//
//       return (valueA < valueB ? -1 : 1) * (this.mSort.direction === 'asc' ? 1 : -1);
//     });
//   }
// }
