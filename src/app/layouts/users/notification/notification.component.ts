import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';

import { User } from 'src/app/shared/model/User';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  edit: string = '';
  user: User = new User();
  userStorage: any = [];
  notifications: any = [];
  notification: Notification ;
  opened = false;

  constructor(
    private active: ActivatedRoute,
    private userService: UsersService,
    private notificationService: NotificationService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private tokenStorageService :TokenStorageService ,
    private usersService : UsersService
  ) {

  }

  async ngOnInit() {
    this.userStorage = await this.tokenStorage.getUser();
    this.active.params.subscribe((res: any) => {
      if (res.id === 'new') this.edit = res.id;
    })
    await this.getuserByUsername();(this.userStorage.id!=null) ? this.getAllNotificationsById():null
  }

  public getuserByUsername() {

    return this.userService.getuserByUsername(this.userStorage.username).subscribe(async (data) => {
      this.user = await data;
      return this.user;
    });
  }                                
                                    
  getAllNotificationsById() {
// console.log(this.userStorage);
this.notifications=[]
    this.notificationService.getNotifications(this.userStorage.id).subscribe(async (data) => {
      this.notifications = data;
      // console.log(data);
    })
  }

}