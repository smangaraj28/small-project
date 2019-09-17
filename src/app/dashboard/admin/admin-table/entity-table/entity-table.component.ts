import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';
import {EntityTableDeleteDialogComponent} from './dialogs/delete/entity-table-delete-dialog.component';
import {Entity} from './models/entity';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private entityId: any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService,
              private activatedRoute: ActivatedRoute) {
  }

  private subCardLabel: string;
  private i = 100;
  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
  private onDestroySubject = new Subject<void>();
  displayedColumns = ['id', 'entityName', 'entityCity', 'entityMobile', 'entityStartDate', 'entityStatus', 'actions'];
  // exampleDatabase: DataService | null;
  // dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  entityData: Entity;
  pIdFormControl = new FormControl('', [
    Validators.required
  ]);
  newEntryFlag = false;
  entityDataSource: Entity[];
  clonedEntityDataSource: Entity[];
  filterValue: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  static initializeData() {
    return {
      entityId: null,
      entityName: null,
      entityShortName: null,
      entityCategory: null,
      entityStatus: null,
      entityDescription: null,
      entityImageUrl: null,
      entityLogo: null,
      entityIndustry: null,
      entityTaxID: null,
      entityAddLine1: null,
      entityAddLine2: null,
      entityCity: null,
      entityState: null,
      entityCountry: null,
      entityPinCode: null,
      entityPhone: null,
      entityFax: null,
      entityMobile: null,
      entityWebsite: null,
      entityEmail: null,
      entityStartDate: null,
      entityFiscalYear: null,
      entityTimeZone: null
    };
  }

  static intializeEntityDataSource() {
    return [
      {
        entityId: 1,
        entityName: 'FAA',
        entityShortName: 'FAA',
        entityCategory: 'FAA',
        entityStatus: 'FAA',
        entityDescription: 'FAA',
        entityImageUrl: 'FAA',
        entityLogo: 'FAA',
        entityIndustry: 'FAA',
        entityTaxID: 'FAA',
        entityAddLine1: 'FAA',
        entityAddLine2: 'FAA',
        entityCity: 'FAA',
        entityState: 'FAA',
        entityCountry: 'FAA',
        entityPinCode: 123,
        entityPhone: 'FAA',
        entityFax: 'FAA',
        entityMobile: 'FAA',
        entityWebsite: 'FAA',
        entityEmail: 'FAA',
        entityStartDate: 'FAA',
        entityFiscalYear: 'FAA',
        entityTimeZone: 'FAA'
      },
      {
        entityId: 2,
        entityName: 'DAA',
        entityShortName: 'FAA',
        entityCategory: 'FAA',
        entityStatus: 'FAA',
        entityDescription: 'FAA',
        entityImageUrl: 'FAA',
        entityLogo: 'FAA',
        entityIndustry: 'FAA',
        entityTaxID: 'FAA',
        entityAddLine1: 'FAA',
        entityAddLine2: 'FAA',
        entityCity: 'FAA',
        entityState: 'FAA',
        entityCountry: 'FAA',
        entityPinCode: 456,
        entityPhone: 'FAA',
        entityFax: 'FAA',
        entityMobile: 'FAA',
        entityWebsite: 'FAA',
        entityEmail: 'FAA',
        entityStartDate: 'FAA',
        entityFiscalYear: 'FAA',
        entityTimeZone: 'FAA'
      },
      {
        entityId: 3,
        entityName: 'BAA',
        entityShortName: 'FAA',
        entityCategory: 'FAA',
        entityStatus: 'FAA',
        entityDescription: 'FAA',
        entityImageUrl: 'FAA',
        entityLogo: 'FAA',
        entityIndustry: 'FAA',
        entityTaxID: 'FAA',
        entityAddLine1: 'FAA',
        entityAddLine2: 'FAA',
        entityCity: 'FAA',
        entityState: 'FAA',
        entityCountry: 'FAA',
        entityPinCode: 786,
        entityPhone: 'FAA',
        entityFax: 'FAA',
        entityMobile: 'FAA',
        entityWebsite: 'FAA',
        entityEmail: 'FAA',
        entityStartDate: 'FAA',
        entityFiscalYear: 'FAA',
        entityTimeZone: 'FAA'
      },
      {
        entityId: 4,
        entityName: 'CAA',
        entityShortName: 'FAA',
        entityCategory: 'FAA',
        entityStatus: 'FAA',
        entityDescription: 'FAA',
        entityImageUrl: 'FAA',
        entityLogo: 'FAA',
        entityIndustry: 'FAA',
        entityTaxID: 'FAA',
        entityAddLine1: 'FAA',
        entityAddLine2: 'FAA',
        entityCity: 'FAA',
        entityState: 'FAA',
        entityCountry: 'FAA',
        entityPinCode: 909,
        entityPhone: 'FAA',
        entityFax: 'FAA',
        entityMobile: 'FAA',
        entityWebsite: 'FAA',
        entityEmail: 'FAA',
        entityStartDate: 'FAA',
        entityFiscalYear: 'FAA',
        entityTimeZone: 'FAA'
      },
    ];
  }

  ngOnInit() {
    const resolvedEntityData = this.activatedRoute.snapshot.data.resolvedEntityData;
    console.log('Resolved Entity Data', resolvedEntityData);
    this.entityDataSource = resolvedEntityData;
    this.clonedEntityDataSource = resolvedEntityData;
    this.entityData = EntityTableComponent.initializeData();
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
    this.subCardLabel = 'Add';
    this.entityId = undefined;
    this.newEntryFlag = true;
    this.entityData = EntityTableComponent.initializeData();
  }

  startEdit(i: number, row) {
    this.subCardLabel = 'Edit';
    this.newEntryFlag = true;
    this.entityId = row.entityId;
    this.entityData = JSON.parse(JSON.stringify(row));
    this.index = i;
    console.log(this.index);
  }

  deleteItem(i: number, row) {
    this.index = i;
    this.entityId = row.entityId;
    const dialogRef = this.dialog.open(EntityTableDeleteDialogComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.entityBranchId === this.id);
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
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


    switch (this.subCardLabel) {
      case 'Add':
        this.entityDataSource.push(this.entityData);
        this.clonedEntityDataSource = [...this.entityDataSource];
        this.i = this.i + 1;
        break;
      case 'Edit':
        const foundIndex = this.entityDataSource.findIndex(x => x.entityId === this.entityId);
        this.entityDataSource[foundIndex] = {...this.entityData};
        this.clonedEntityDataSource = [...this.entityDataSource];
        break;
    }
    console.log(this.clonedEntityDataSource);
  }

  onCancel() {
    this.newEntryFlag = false;
  }

  filterValueChange($event: any) {
    this.clonedEntityDataSource = this.entityDataSource.slice().filter((value: Entity) => {
      const searchStr = (value.entityName) ?
        (value.entityName).toLowerCase() : '';
      return searchStr.indexOf(this.filterValue.toLowerCase()) !== -1;
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
}

// export class ExampleDataSource extends DataSource<Entity> {
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
//   filteredData: Entity[] = [];
//   renderedData: Entity[] = [];
//
//   constructor(public exampleDatabase: DataService,
//               public mPaginator: MatPaginator,
//               public mSort: MatSort) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChangeSubject.subscribe(() => this.mPaginator.pageIndex = 0);
//   }
//
//   /** Connect function called by the table to retrieve one stream containing the entityData to render. */
//   connect(): Observable<Entity[]> {
//     // Listen for any changes in the base entityData, sorting, filtering, or pagination
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
//         // Filter entityData
//         this.filteredData = this.exampleDatabase.data.slice().filter((issue: Entity) => {
//           const searchStr = (issue.entityId + issue.entityName + issue.entityCategory) ?
//             (issue.entityId + issue.entityName + issue.entityCategory).toLowerCase() : '';
//           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//         });
//
//         // Sort filtered entityData
//         const sortedData = this.sortData(this.filteredData.slice());
//
//         // Grab the page's slice of the filtered sorted entityData.
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
//   /** Returns a sorted copy of the database entityData. */
//   sortData(data: Entity[]): Entity[] {
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
//         case 'entityId':
//           [propertyA, propertyB] = [a.entityId, b.entityId];
//           break;
//         case 'entityName':
//           [propertyA, propertyB] = [a.entityName, b.entityName];
//           break;
//         case 'entityCategory':
//           [propertyA, propertyB] = [a.entityCategory, b.entityCategory];
//           break;
//         case 'entityStatus':
//           [propertyA, propertyB] = [a.entityStatus, b.entityStatus];
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
