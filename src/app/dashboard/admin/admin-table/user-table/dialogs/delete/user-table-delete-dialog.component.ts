import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-user-table-delete-dialog',
  templateUrl: './user-table-delete-dialog.component.html',
  styleUrls: ['./user-table-delete-dialog.component.scss']
})
export class UserTableDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserTableDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.roleId);
  }
}
