import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Entity} from '../../models/entity';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './branch-table-add-dialog.component.html',
  styleUrls: ['./branch-table-add-dialog.component.scss']
})

export class BranchTableAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<BranchTableAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Entity,
              public dataService: DataService) {
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
  //
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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }
}
