import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export abstract class ValidatorService {
  abstract getRowValidator(): FormGroup;
}
