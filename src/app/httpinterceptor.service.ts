import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JWTTokenService } from './jwttoken.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor{

  constructor( private jwtService: JWTTokenService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.jwtService.getToken();
    if (token !== null) {
      if (this.jwtService.isTokenExpired()) {
        console.log('expired token');
        this.router.navigateByUrl('/login');
        // return
      }
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });    
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json')})
    }
    
    request = request.clone({ headers: request.headers.set('Accept', 'application/json')})

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event => ')
          console.log(event)
        }
        return event
      })
    )
  }
}
