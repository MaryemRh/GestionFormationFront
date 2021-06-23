import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeFormation } from '../model/DemandeFormation';

const API_URL = 'http://localhost:8080/api/auth/DemandeFormation';
const API_URL1 = 'http://localhost:8080/api/auth/DemandeFormationByUser';
const API_URL_Update = 'http://localhost:8080/api/auth/DemandeFormation/update';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class DemandeFormationService {

  constructor(private http: HttpClient) { }

  getDemandeFormations(): Observable<any> {
    return this.http.get<any>(API_URL + '', httpOptions);
  }
  getDemandeFormationsByusers(username ,usernameAssigne): Observable<any> {
    return this.http.get<any>(API_URL1 + '?user='+username+'&assigne='+usernameAssigne, httpOptions);
  }
 
  createDemandeFormation(value: any): Observable<Object> {
    return this.http.post(API_URL + '/create',value, httpOptions);
  }
  approuveDemandeFormation(id,formationName,ch): Observable<Object> {
    return this.http.post(API_URL + '/approuve?username='+id+'&formationName='+formationName+'&action='+ch, httpOptions);
  }
  getDemandeFormation(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/'+id, httpOptions);
  }
  updateDemandeFormation(value: any): Observable<Object> {
    return this.http.put(API_URL_Update, value);
  }
  updateFormation(demandeFormation: DemandeFormation): Observable<Object> {
    return this.http.put(API_URL + '/update', demandeFormation, httpOptions);
  }

  deleteDemandeFormation(id: any) : Observable<Object>{
    return this.http.delete(API_URL +'/delete'+'/'+id, httpOptions);
  }
}
