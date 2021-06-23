import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/api/auth/notifications';
const API_URL1 = 'http://localhost:8080/api/auth/notifications/Users/';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private http: HttpClient) { }

  getNotificationByUser(user): Observable<any> {
    return this.http.get<any>(API_URL + '?username='+user, httpOptions);
  }

  getNotifications(user): Observable<any> {
    return this.http.get<any>(API_URL1 + user, httpOptions);
  }
}
