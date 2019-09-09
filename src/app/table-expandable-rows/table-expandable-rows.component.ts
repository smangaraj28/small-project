import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Modules} from './modules';

@Component({
  selector: 'app-table-expandable-rows',
  templateUrl: './table-expandable-rows.component.html',
  styleUrls: ['./table-expandable-rows.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TableExpandableRowsComponent implements OnInit {
  moduleDetails: Modules[];
  displayedModules: string[] = ['moduleId', 'moduleName'];
  displayedSubModules: string[] = ['subModuleId', 'subModuleName'];
  expandedElement: Modules | null;
  private dataSourceModule: Modules[];

  ngOnInit(): void {
    this.moduleDetails = [
      {
        moduleId: 1,
        moduleName: 'POS',
        moduleDescription: [
          {subModuleId: 1, subModuleName: 'AVX'},
          {subModuleId: 2, subModuleName: 'POP'}
        ]
      },
      {
        moduleId: 2,
        moduleName: 'Admin',
        moduleDescription: [
          {subModuleId: 1, subModuleName: 'Role'},
          {subModuleId: 2, subModuleName: 'Branch'}
        ]
      },
      {
        moduleId: 3,
        moduleName: 'Booking',
        moduleDescription: [
          {subModuleId: 1, subModuleName: 'Room'},
          {subModuleId: 2, subModuleName: 'Rest'}
        ]
      },
    ];
    this.dataSourceModule = this.moduleDetails;
  }

}
