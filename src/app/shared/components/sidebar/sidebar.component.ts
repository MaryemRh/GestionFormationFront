import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  public activeMenu = '';
  public user: any;
  public active: string;

  constructor(public sidebarservice: SidebarService,
    private tokenSer: TokenStorageService) {
  }

  ngOnInit() {
    feather.replace();
  }

  isUSER(){
    // console.log(this.tokenSer.getUser());

    return this.tokenSer.getUser().roles[0]==="ROLE_ROLE_USER" ? true:false

    }
  openItem(item: string) {
    if (this.activeMenu === item) {
      this.activeMenu = '';
      this.active = '';
    } else {
      this.activeMenu = item;
      this.active = 'active';
    }
  }

}
