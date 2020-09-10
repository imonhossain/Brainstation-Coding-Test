import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from '../../providers/services/spinner.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HomeServices } from './services/home.services';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    UserDetailsComponent,

  ],
  providers: [
    SpinnerService,
  ],
})
export class UserModule { }