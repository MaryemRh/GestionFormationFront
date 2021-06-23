import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';

//  const AUTH_API = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/auth/';
//const AUTH_API = 'http://172.18.3.170:8080/sirh/api/auth/';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:boolean
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post<JwtResponse>(AUTH_API + 'signin', credentials).pipe(map((res:any)=>{
      console.log(res);
      return res;
    },(err:any)=>{
      console.log(err);
      return err
    }));
  }

  logout(): Observable<any> {
    return this.http.post<any>(AUTH_API + 'logout', httpOptions);
  }
  public isAuthenticated() {
   return sessionStorage.getItem('auth-token')!==null ?  true: false
   

  }
}
