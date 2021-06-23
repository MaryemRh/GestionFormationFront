import { AuthService } from './../authentication/auth.service';
/* import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      if (localStorage.getItem('token') != null) {

      }
      throw new Error('Method not implemented.');
  }
}
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { TokenStorageService } from '../authentication/token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {
  role: string;
  token: any = []
  roles: string[] = [];
  adminRole: boolean;
  constructor(public auth: AuthService,
    private router: Router, private tokenStorage: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    this.token = JSON.parse(window.sessionStorage.getItem('auth-user'));


    if (!this.auth.isAuthenticated() ) {
      
      this.router.navigate(['/login']);
      // window.sessionStorage.clear();
      
      console.log('false');
      return false;
    }
    if(expectedRole){
       return this.token.roles[0] !== expectedRole? false :true 
       alert('vous nstets pas autoriser a effectue cette action');
    }
    console.log('ok');


    return true;
  }
}
