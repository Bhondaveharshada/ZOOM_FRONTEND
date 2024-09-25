import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { ClientComponent } from '../client/client.component';
import { HostComponent } from '../host/host.component';
import { CreatemeetComponent } from '../createmeet/createmeet.component';


const routes: Routes = [
  {
    path:'createmeeting', component:CreatemeetComponent
  },
 {
  path:'client', component:ClientComponent
 },
 {
  path:'host', component:HostComponent,
 }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
