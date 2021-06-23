import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/campagne/';
const API_URL = 'http://172.18.3.170:8080/sirh/api/v1/campagne/';
// const API_URL = 'http://localhost:8080/api/v1/campagne/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class CampagneService {

  constructor(private http: HttpClient) { }

  getCampagneList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  lancerCampagne(campagne: any) {
    return this.http.post(API_URL + 'create', campagne, httpOptions);
  }

  deleteCampagne(id) {
    return this.http.delete(`${API_URL}delete/${id}`, httpOptions);
  }

  lancerEAE(id, employees: any[]) {
    return this.http.post(`${API_URL}lancer/${id}`, employees, httpOptions);
  }

  getEntretienList(id: any) {
    return this.http.get<any[]>(`${API_URL}entretiens/${id}`, httpOptions);
  }

  getMesEntretienList() {
    return this.http.get<any[]>(`${API_URL}entretien`, httpOptions);
  }
}
