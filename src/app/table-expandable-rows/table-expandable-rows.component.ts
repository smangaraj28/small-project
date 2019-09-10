import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Modules} from './modules';
import {MatCheckboxChange} from '@angular/material';

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

export class TableExpandableRowsComponent {
  @Input() moduleData: Modules[];
  displayedModules: string[] = ['moduleId', 'moduleName', 'readAllFlag', 'writeAllFlag'];
  displayedSubModules: string[] = ['subModuleId', 'subModuleName', 'read', 'write'];
  expandedElement: Modules | null;

  onReadChange(event: MatCheckboxChange, element: any) {
    if (element.readAllFlag === true) {
      element.moduleDescription.forEach(value => {
        value.readFlag = true;
      });
    } else {
      element.moduleDescription.forEach(value => {
        value.readFlag = false;
      });
    }
  }

  onWriteChange(event: MatCheckboxChange, element: any) {
    if (element.writeAllFlag === true) {
      element.moduleDescription.forEach(value => {
        value.writeFlag = true;
      });
    } else {
      element.moduleDescription.forEach(value => {
        value.writeFlag = false;
      });
    }
  }
}
