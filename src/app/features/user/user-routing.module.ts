
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }