import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Formation } from '../model/Formation';
const API_URL = 'http://localhost:8080/api/auth/Formations';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`

  })
};

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  constructor(private http: HttpClient) { }

  getFormations(): Observable<any> {
    return this.http.get<any>(API_URL + '', httpOptions);
  }
  getAllParticipantsById(id): Observable<any> {
    return this.http.get<any>(API_URL + '/Participants/'+id, httpOptions);
  }
  createFormation(formation: Formation): Observable<Object> {
    return this.http.post(API_URL + '/create', formation, httpOptions);
  }
  getFormation(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/'+id, httpOptions);
  }
  updateFormation(formation: Formation): Observable<Object> {
    return this.http.put(API_URL + '/update', formation, httpOptions);
  }
  deleteFormation(id: any) : Observable<Object>{
    return this.http.delete(API_URL +'/delete'+'/'+id, httpOptions);
  }
  inscriptionFormation(usernameId:any,formationId : any){
    return this.http.post(API_URL + '/inscription?participantId='+usernameId+'&formationId='+formationId,{}, httpOptions);

  }
  approveFormation(usernameId:any,formationId : any) : Observable<Object>{
    return this.http.post(API_URL + '/approve?participantId='+usernameId+'&formationId='+formationId,{}, httpOptions);

  }

  getHistoriqueFormations(): Observable<any> {
    return this.http.get<any>(API_URL + '/historic', httpOptions);
  }
  getHistoriqueFormationsByParticipant(participant): Observable<any> {
    return this.http.get<any>(API_URL + '/historic/'+participant, httpOptions).pipe(map(
      res =>{
        return res;
      },err=>{
        console.log(err);

      }
    ));
  }
/*
  synchroniserEmployee(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'synchroniser', httpOptions);
  }

  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL, httpOptions);
  }

  getSuperieurEmployeesList(username: any): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}employees/${username}`, httpOptions);
  }

  getRoleList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'roles', httpOptions);
  }

  getCurrentUser() {
    return this.http.get<any>(API_URL + 'currentUser', httpOptions);
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get<any>(`${API_URL}${id}`, httpOptions);
  }

  createEmployee(employee: object) {
    return this.http.post(API_URL + 'create', employee, httpOptions);
  }

  updateEmployee(employee: object) {
    return this.http.put(API_URL + 'update', employee, httpOptions);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${API_URL}delete/${id}`, httpOptions);
  }

  getAllSuperieur(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'evaluateurs', httpOptions);
  }*/
}
