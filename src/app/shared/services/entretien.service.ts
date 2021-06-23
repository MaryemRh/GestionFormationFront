import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/entretien/';
const API_URL = 'http://172.18.3.170:8080/sirh/api/v1/entretien/';
// const API_URL = 'http://localhost:8080/api/v1/entretien/';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private http: HttpClient) { }

  updateEntretien(entretien: object) {
    return this.http.put(API_URL + 'update', entretien, httpOptions);
  }

  updatePrimePerf(prime: object) {
    return this.http.put(API_URL + 'prime/update', prime, httpOptions);
  }

  getEntretienInformations(id: any) {
    return this.http.get<any>(`${API_URL}${id}`, httpOptions);
  }

  getPrimePerf(id: any) {
    return this.http.get<any>(`${API_URL}performance/${id}`, httpOptions);
  }


  addObjectifs(objectif: any) {
    return this.http.post(API_URL + 'addObjectifs', objectif, httpOptions);
  }

  changeStatus(id: number) {
    return this.http.put(`${API_URL}status`, id, httpOptions);
  }

  validerEntretiens(ids: any[]) {
  return this.http.put(`${API_URL}validerEntretiens`, ids, httpOptions);
  }

  cloturerEntretien(id: any) {
    return this.http.put(`${API_URL}cloturerEntretien`, id, httpOptions);
  }

  cloturerEntretiens(ids: any[]) {
    return this.http.put(`${API_URL}cloturerEntretiens`, ids, httpOptions);
  }

  deleteObjectif(id: any) {
    return this.http.delete(`${API_URL}deleteObjectif/${id}`, httpOptions);
  }
}
