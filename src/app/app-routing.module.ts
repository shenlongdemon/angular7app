import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  
  // {path: '', component: AppComponent},
  {path: 'dassee', loadChildren: './dassee/dassee.module'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
