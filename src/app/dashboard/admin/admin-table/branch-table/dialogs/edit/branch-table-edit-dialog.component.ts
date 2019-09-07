import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './branch-table-edit-dialog.component.html',
  styleUrls: ['./branch-table-edit-dialog.component.scss']
})
export class BranchTableEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<BranchTableEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

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

  // getErrorMessage() {
  //   return this.formControl.hasError('required') ? 'Required field' :
  //     this.formControl.hasError('email') ? 'Not a valid email' :
  //       '';
  // }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
}
