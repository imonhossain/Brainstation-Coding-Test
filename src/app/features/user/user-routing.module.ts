
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-details', component: UserDetailsComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }