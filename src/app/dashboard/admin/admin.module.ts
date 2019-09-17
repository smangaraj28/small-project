import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserTableComponent} from './admin-table/user-table/user-table.component';
import {HttpClientModule} from '@angular/common/http';
import {RoleTableComponent} from './admin-table/role-table/role-table.component';
import {EntityTableComponent} from './admin-table/entity-table/entity-table.component';
import {EntityTableDeleteDialogComponent} from './admin-table/entity-table/dialogs/delete/entity-table-delete-dialog.component';
import {EntityBranchTableComponent} from './admin-table/entity-branch-table/entity-branch-table.component';
import {EntityBranchTableDeleteDialogComponent} from './admin-table/entity-branch-table/dialogs/delete/entity-branch-table-delete-dialog.component';
import {RoleTableDeleteDialogComponent} from './admin-table/role-table/dialogs/delete/role-table-delete-dialog.component';
import {DragDropDualListComponent} from './admin-table/drag-drop-dual-list/drag-drop-dual-list.component';
import {ModuleTableExpandableRowsComponent} from './admin-table/role-table/module-table-expandable-rows/module-table-expandable-rows.component';
import {UserTableExpandableRowsComponent} from './admin-table/user-table/user-table-expandable-rows/user-table-expandable-rows.component';
import {UserTableDeleteDialogComponent} from './admin-table/user-table/dialogs/delete/user-table-delete-dialog.component';
import {PaymentComponent} from './billing/payment/payment.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: '', redirectTo: 'entity', pathMatch: 'full'},
  {path: 'entity', component: EntityTableComponent},
  {path: 'branch', component: EntityBranchTableComponent},
  {path: 'role', component: RoleTableComponent},
  {path: 'user', component: UserTableComponent},
  {path: 'payment', component: PaymentComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
  ],
  declarations: [
    UserTableComponent,
    EntityTableComponent,
    EntityTableDeleteDialogComponent,
    EntityBranchTableComponent,
    EntityBranchTableDeleteDialogComponent,
    RoleTableComponent,
    RoleTableDeleteDialogComponent,
    DragDropDualListComponent,
    ModuleTableExpandableRowsComponent,
    UserTableExpandableRowsComponent,
    UserTableDeleteDialogComponent,
    PaymentComponent
  ],
  entryComponents: [
    EntityTableDeleteDialogComponent,
    EntityBranchTableDeleteDialogComponent,
    RoleTableDeleteDialogComponent,
    UserTableDeleteDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
