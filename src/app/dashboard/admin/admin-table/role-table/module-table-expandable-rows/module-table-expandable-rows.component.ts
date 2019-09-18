import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatCheckboxChange} from '@angular/material';
import {Modules} from '../models/role';

@Component({
  selector: 'app-module-table-expandable-rows',
  templateUrl: './module-table-expandable-rows.component.html',
  styleUrls: ['./module-table-expandable-rows.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ModuleTableExpandableRowsComponent {

  @Input() moduleData: Modules[];
  displayedModules: string[] = ['moduleName', 'readAllFlag', 'writeAllFlag'];
  displayedSubModules: string[] = ['subModuleId', 'subModuleName', 'read', 'write'];
  expandedElement: Modules | null;

  constructor() {
  }

  onReadChange(event: MatCheckboxChange, element: any) {
    if (element.readAllFlag === true) {
      element.moduleDescription.forEach(value => {
        value.readFlag = true;
      });
    } else {
      element.moduleDescription.forEach(value => {
        value.readFlag = false;
        value.writeFlag = false;
        element.writeAllFlag = false;
      });
    }
  }

  onWriteChange(event: MatCheckboxChange, element: any) {
    if (element.writeAllFlag === true) {
      element.moduleDescription.forEach(value => {
        value.writeFlag = true;
        value.readFlag = true;
        element.readAllFlag = true;
      });
    } else {
      element.moduleDescription.forEach(value => {
        value.writeFlag = false;
        value.readFlag = true;
        element.readAllFlag = true;
      });
    }
  }

  subReadChange($event: MatCheckboxChange, element) {
    console.log(element);
    if ($event.checked === false) {

    }
  }
}
