import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl =  'http://127.0.0.1:8000/api/login_check';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /** POST */
  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(this.authUrl, {username, password}, this.httpOptions).pipe(
      tap(token => console.log(token))
    )
  }
}
