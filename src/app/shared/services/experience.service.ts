import { Experience } from './../model/experience';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL = 'http://localhost:8080/api/auth/Experiences';
const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`

  })
};
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  getAllExperiences(): Observable<any> {
    return this.http.get<any>(API_URL , httpOptions);
  }
  getAllExperiencesByUserId(usernameId): Observable<any> {
    return this.http.get<any>(API_URL + '/Users/'+usernameId, httpOptions);
  }
  getAllExperiencesById(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/'+id, httpOptions);
  }
  createExperience(experience: Experience): Observable<Object> {
    return this.http.post(API_URL + '/create', experience, httpOptions);
  }

  updateExperience(experience: Experience): Observable<Object> {
    return this.http.put(API_URL + '/update', experience, httpOptions);
  }
  deleteExperience(id: any): Observable<Object> {
    return this.http.delete(API_URL + '' + '/' + id, httpOptions);
  }

}

 