import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './branch-table-delete-dialog.component.html',
  styleUrls: ['./branch-table-delete-dialog.component.scss']
})
export class BranchTableDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<BranchTableDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.entityId);
  }
}
