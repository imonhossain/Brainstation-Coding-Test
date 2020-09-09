import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { SpinnerService } from '../../providers/services/spinner.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    UserComponent,
    HomeComponent,

  ],
  providers: [
    SpinnerService,
  ],
})
export class UserModule { }