import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-role-table-delete-dialog',
  templateUrl: './role-table-delete-dialog.component.html',
  styleUrls: ['./role-table-delete-dialog.component.scss']
})
export class RoleTableDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<RoleTableDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.roleId);
  }
}
