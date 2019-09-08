import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardViewComponent} from './dashboard-view.component';
import {RouterModule, Routes} from '@angular/router';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {SideMenuItemsComponent} from './side-menu-items/side-menu-items.component';
import {DashboardSidenavComponent} from './dashboard-sidenav/dashboard-sidenav.component';
import {MaterialModule} from '../material.module';
import {TopNavComponent} from './top-nav/top-nav.component';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserMenuComponent} from './tool-bar/user-menu/user-menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '', component: DashboardViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  declarations: [
    DashboardViewComponent,
    SideMenuComponent,
    SideMenuItemsComponent,
    DashboardSidenavComponent,
    TopNavComponent,
    ToolBarComponent,
    UserMenuComponent
  ]
})
export class DashboardModule {
}
