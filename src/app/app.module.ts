import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      extendedTimeOut: 4000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
