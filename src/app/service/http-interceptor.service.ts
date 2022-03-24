import {Injectable, Injector} from '@angular/core';
import {AuthService} from "./auth.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private loginService: AuthService,
              private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);

    if (this.loginService.isUserLoggedIn() && req.url.indexOf('login') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Authorization': `Basic ${window.btoa(this.loginService.username + ":" + this.loginService.password)}`
          'Authorization' : `${authService.getToken()}`
        })
      });
      return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if(error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      }));
    } else {
      return next.handle(req);
    }
  }


}
