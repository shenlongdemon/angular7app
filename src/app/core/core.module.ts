import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {ApiClientService} from "./apiclient";

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers: [ApiClientService]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
