import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {provide: APP_BASE_HREF, useValue: '/mypath' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
