import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poste } from '../model/Poste';


// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/activite/';
const API_URL = 'http://localhost:8080/api/auth/Postes/';
const API_URL1 = 'http://localhost:8080/api/auth/Postes';
const EmployeesByPosteIdUrl = 'http://localhost:8080/api/auth/Postes/EmployeesByPosteId/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};


@Injectable({
  providedIn: 'root'
})
export class PosteService {
  constructor(private http: HttpClient) { }

  getPosteList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  createPoste(poste: object) {
    return this.http.post(API_URL1 + '/create', poste, httpOptions);
  }

  updatePoste(poste: Poste): Observable<Object>  {
    return this.http.put(API_URL1 + '/update', poste, httpOptions);
  }

  deletePoste(id: any) : Observable<Object>{
    return this.http.delete(API_URL +'/delete'+'/'+id, httpOptions);
  }
  
getEmployeesByPosteId(id: number): Observable<any> {
  return this.http.get(`${EmployeesByPosteIdUrl}create/${id}`);
}

}
