import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/activite/';
const API_URL = 'http://localhost:8080/api/auth/Equipes/';
//  const API_URL = 'http://localhost:8080/api/v1/activite/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient) { }

  getEquipesList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  createEquipes(equipe,nomActivite) {
    return this.http.post<any[]>(API_URL +'create?nomActivite='+nomActivite, equipe, httpOptions);
  }

  updateEquipes(activite,nomActivite,username) {
    return this.http.put<any[]>(API_URL+'update?nomActivite='+nomActivite+'&username='+username, activite, httpOptions);
  }
 
}
