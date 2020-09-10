
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { RepositoryDetailsComponent } from './pages/repository-details/repository-details.component';
import { TopUserComponent } from './pages/top-user/top-user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-details', component: UserDetailsComponent },
      { path: 'repository-details', component: RepositoryDetailsComponent },
      { path: 'top-users', component: TopUserComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }