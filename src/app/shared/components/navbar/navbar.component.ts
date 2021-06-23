import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { AuthService } from '../../authentication/auth.service';
import { TokenStorageService } from '../../authentication/token-storage.service';
import { MessageService } from '../../services/message.service';
import { NotificationService } from '../../services/notification.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public employee: any;
  notifcations :any;
  messages :any;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,
    private router:Router,
    private userService: UsersService,
      private notifcationService :NotificationService,
      private messageService :MessageService) { }

  ngOnInit() {
    feather.replace();
    this.userService.getCurrentUser().subscribe(data => { this.employee = data ;
      // console.log(this.employee);
    });
      this.notifcationService.getNotificationByUser(this.tokenStorageService.getUser().username).subscribe(data=>{
        this.notifcations =data;
        // console.log(data)
      });
      this.messageService.getMessageByUser(this.tokenStorageService.getUser().username).subscribe(data=>{
        this.messages =data;
        // console.log(data)
      })
  }

  logout() {
    this.authService.logout();
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('login')
    // window.location.reload();
  }

 /*  goToNotifications(){
    this.router.navigate(['/notification']);
  } */

}
