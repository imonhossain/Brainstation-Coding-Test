import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from '../../providers/services/spinner.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { RepositoryDetailsComponent } from './pages/repository-details/repository-details.component';
import { TopUserComponent } from './pages/top-user/top-user.component';
import { NgSelectModule } from '@ng-select/ng-select'
@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    UserDetailsComponent,
    RepositoryDetailsComponent,
    TopUserComponent,
  ],
  providers: [
    SpinnerService,
  ],
})
export class UserModule { }