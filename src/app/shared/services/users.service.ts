import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
// const API_URL = 'https://plateforme-evaluation.actia-engineering.tn:7443/sirh/api/v1/employee/';
const API_URL = 'http://localhost:8080/api/auth/Employees/';
const API_URL2 = 'http://localhost:8080/api/auth/Employees';
const API_URL1 = 'http://localhost:8080/api/auth';
// const API_URL = 'http://localhost:8080/api/v1/employee/';

const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line:object-literal-key-quotes
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getusers(): Observable<any> {
    return this.http.get<any>(API_URL1 + '/userss', httpOptions);
  }
  getuserByUsername(username :string): Observable<any> {
    return this.http.get<any>(API_URL1 + '/users?username='+username, httpOptions);
  }
  getCurrentRole(): Observable<any> {
    return this.http.get<any>(API_URL + 'role', httpOptions);
  }

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

  getEmployeeId(id: number): Observable<any> {
    return this.http.get<any>(API_URL2 + '/'+id, httpOptions);
  }

  createEmployee(employee: object) {
    return this.http.post(API_URL1 + '/AddEmployee', employee, httpOptions);
  }

  updateEmployee(employee: User) {
    return this.http.put(API_URL2 + '/update', employee, httpOptions);
  }
  patchEmployee(employee: User) {
    console.log(employee);

    return this.http.patch(API_URL2 + '/patch', employee, httpOptions);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${API_URL}delete/${id}`, httpOptions);
  }

  getAllSuperieur(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'evaluateurs', httpOptions);
  }
}
