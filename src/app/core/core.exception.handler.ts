/* angular stuff */
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class CoreExceptionHandler implements ErrorHandler {
    constructor( private injector: Injector) { 
      
    }

    handleError(error:any) {
        const toastr = this.injector.get(ToastrService);   
        if(error == null) return;
        console.error('It happens: ', error);
        toastr.error(error.message,'Error',{
            timeOut: 900000,
            extendedTimeOut:4000,
            positionClass: 'toast-bottom-right',
            closeButton:true,
        });
        
    }
}