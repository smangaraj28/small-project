import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from '../validator.service';


@Injectable()
export class PersonValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      contact: new FormControl(null, Validators.required),
      registerno: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }
}
