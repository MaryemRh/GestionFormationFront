import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../shared/authentication/auth.service';
import { delay, filter } from 'rxjs/operators';
import { TokenStorageService } from '../shared/authentication/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) {

  }

  ngOnInit() {
    console.log(this.tokenStorage.getToken());

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(this.roles[0]);

        // window.sessionStorage.setItem('roles', data.role);
        // this.router.events.pipe(filter(value => value instanceof NavigationEnd)).subscribe(event => {
        //   window.location.reload();
        // });
        (this.roles[0] === "ROLE_ROLE_USER") ? this.router.navigate(['/formations/formations']): this.router.navigate(['/']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        /*         if (err instanceof HttpErrorResponse) {
                  const errorMessages = new Array<{ propName: string; errors: string }>();
        
                  if (err.status === 422) {
                    this.errorMessage = 'Unauthorized';
                  } else if (err.status === 401) {
                    this.errorMessage = 'Unauthorized';
                  } else if (err.status === 404) {
                    this.errorMessage = 'Not Found';
                } */
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
