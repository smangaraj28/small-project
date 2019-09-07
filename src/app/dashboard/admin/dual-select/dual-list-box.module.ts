import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DualListComponent} from './dual-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  declarations: [DualListComponent],
  exports: [DualListComponent]
})
export class DualListBoxModule {
}

