import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import {take, exhaustMap} from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthServiceService) {      
    }
  
    intercept(req: HttpRequest<any>, next:HttpHandler ) {
        return this.authService.userSubject.pipe(
          take(1),
          exhaustMap((user)=>{
            if(!user) {
              return next.handle(req);
            }
            let modifiedRequest = req.clone({params: new HttpParams().set('auth',user.token)});
            return next.handle(modifiedRequest)
          })
        );
    }
}
