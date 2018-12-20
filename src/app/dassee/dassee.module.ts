import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {DasseeRoutingModule} from './dassee-routing.module';
import {DasseeService} from './services/dassee.service';
import {StoreService} from './repositories/store.service';
import {ApiService} from './repositories/api.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [LoginComponent, MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    DasseeRoutingModule
  ],
  exports: [
    LoginComponent, MainComponent
  ],
  providers: [
    DasseeService, StoreService, ApiService
  ]
})
export class DasseeModule {
}
