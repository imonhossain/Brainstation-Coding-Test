import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './spinner.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private timer = 0;

  constructor(
    public spinnerService: SpinnerService,
    private injector: Injector
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.sendRequest(request, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = req;

    clearTimeout(this.timer);
    if (this.spinnerService.isBlock() === false) {
      this.timer = setTimeout(() => {
        this.spinnerService.blockOn();
      });
    }
    return next.handle(authRequest)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.spinnerService.blockOff();
            });
          }
        }),
        catchError(err => {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.spinnerService.blockOff();
          });
          const toastr = this.injector.get(ToastrService);   
            toastr.error(err.message,'Error',{
              timeOut: 900000,
              extendedTimeOut:4000,
              positionClass: 'toast-bottom-right',
              closeButton:true,
          });
          return throwError(err);
        })
      );
  }
}