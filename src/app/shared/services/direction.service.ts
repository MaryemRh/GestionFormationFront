import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/direction/';
const API_URL = 'http://localhost:8080/api/auth/Directions/';
// const API_URL = 'http://localhost:8080/api/v1/direction/';
const API_URL1 = 'http://localhost:8080/api/auth/Activites/ActivitiesByDirectionId/';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  constructor(private http: HttpClient) { }

  getDirectionList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  createDirection(direction,username): Observable<any[]> {
    return this.http.post<any[]>(API_URL+ 'create?username='+username, direction, httpOptions);
  }


  updateDirection(id,direction,username) {
    return this.http.put<any[]>(API_URL+ 'update/'+ id +'?username='+username,direction, httpOptions);
  }
 

  getActivitiesByDirection(nomDirection:any): Observable<any> {
    return this.http.get<any>(API_URL +"ActivitiesByDirection?nomDirection="+nomDirection ,httpOptions);
  }
}
