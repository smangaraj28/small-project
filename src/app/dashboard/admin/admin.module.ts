import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';
import {DualListBoxModule} from './dual-select/dual-list-box.module';
import {DualSelectRoleComponent} from './dual-select/dual-select-role/dual-select-role.component';
import {RoleScreenComponent} from './role-screen/role-screen.component';
import {UserScreenComponent} from './user-screen/user-screen.component';
import {BranchScreenComponent} from './branch-screen/branch-screen.component';
import {PersonListComponent} from './angular-table/person-list/person-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserTableComponent} from './admin-table/user-table/user-table.component';
import {HttpClientModule} from '@angular/common/http';
import {BranchTableAddDialogComponent} from './admin-table/branch-table/dialogs/add/branch-table-add-dialog.component';
import {BranchTableEditDialogComponent} from './admin-table/branch-table/dialogs/edit/branch-table-edit-dialog.component';
import {RoleTableComponent} from './admin-table/role-table/role-table.component';
import {BranchTableComponent} from './admin-table/branch-table/branch-table.component';
import {BranchTableDeleteDialogComponent} from './admin-table/branch-table/dialogs/delete/branch-table-delete-dialog.component';


export const DASHBOARD_ROUTES: Routes = [
  {path: '', redirectTo: 'branch', pathMatch: 'full'},
  {path: 'branch', component: BranchScreenComponent},
  {path: 'role', component: RoleScreenComponent},
  {path: 'user', component: UserScreenComponent},
  {path: 'hotel-table', component: BranchTableComponent},
  {path: 'branch-table', component: BranchScreenComponent},
  {path: 'role-table', component: RoleTableComponent},
  {path: 'user-table', component: UserTableComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule,
    FlexLayoutModule,
    DualListBoxModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
  ],
  declarations: [
    DualSelectRoleComponent,
    RoleScreenComponent,
    UserScreenComponent,
    BranchScreenComponent,
    PersonListComponent,
    RoleTableComponent,
    UserTableComponent,
    BranchTableComponent,
    BranchTableDeleteDialogComponent,
    BranchTableAddDialogComponent,
    BranchTableEditDialogComponent
  ],
  entryComponents: [
    BranchTableDeleteDialogComponent,
    BranchTableAddDialogComponent,
    BranchTableEditDialogComponent
  ]
})
export class AdminModule {
}
