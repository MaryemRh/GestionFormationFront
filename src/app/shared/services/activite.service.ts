import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/activite/';
const API_URL = 'http://localhost:8080/api/auth/Activites/';
//  const API_URL = 'http://localhost:8080/api/v1/activite/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};


@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  constructor(private http: HttpClient) { }

  getActiviteList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  createActivite(activite,username) {
    return this.http.post<any[]>(API_URL+ 'create?username='+username, activite, httpOptions);
  }

  updateActivite(id,activite,username) {
    return this.http.put<any[]>(`${API_URL}update/`+id+'/activite?username='+username, activite, httpOptions);
  }
  getEquipesByActivite(nomActivite): Observable<any> {
    return this.http.get<any[]>(API_URL+'EquipesByActivite?nomActivite='+nomActivite, httpOptions);

  }
}
