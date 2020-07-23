import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthService } from '../../app/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
//     constructor(private auth:AuthService){}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       setHeaders: {
//         'Content-Type' : 'application/json; charset=utf-8',
//         'Accept'       : 'application/json',
//         'Authorization': `Bearer ${this.auth.loadToken()}`,
//       },
//     });

//     return next.handle(req);
//   }
// }
constructor(private auth:AuthService,private route:Router){}
intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>
{
  if(req.headers.get('noauth'))
  {
    return next.handle(req.clone());
  }
  else
  {
    const clonereq=req.clone({
      headers:req.headers.set("Authorization","Bearer"+this.auth.loadToken())
    });
    return next.handle(clonereq).pipe(
      (tap(
        events=>{},
        err=>{if(err.error.auth==false)
        {
          this.route.navigate(['/login']);
        }
        }))
    )
  }
}
}
