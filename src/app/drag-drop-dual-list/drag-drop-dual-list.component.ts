import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop-dual-list',
  templateUrl: './drag-drop-dual-list.component.html',
  styleUrls: ['./drag-drop-dual-list.component.scss']
})
export class DragDropDualListComponent {
  @Input() leftTitle;
  @Input() rightTitle;
  @Input() availableModuleName;
  @Input() selectedModuleName;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
