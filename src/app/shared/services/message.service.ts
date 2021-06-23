import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/auth/messages';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessageByUser(user): Observable<any> {
    return this.http.get<any>(API_URL + '?username='+user, httpOptions);
  }
}
