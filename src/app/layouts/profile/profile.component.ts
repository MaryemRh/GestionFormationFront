import { DemandeFormationService } from './../../shared/services/demande-formation.service';
import { FormationService } from './../../shared/services/formation.service';
import { User } from './../../shared/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = [];
  formations: any = [];
  newUser: User = new User()
  edit: string = ""
  userStorage: any = [];
  constructor(
    private userService: UsersService,
    private formationService: FormationService,
    private demandeformationService: DemandeFormationService,
    private active: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService) {
    this.userStorage = this.tokenStorage.getUser()
  }

  async ngOnInit() {
    this.active.params.subscribe((res: any) => {
   if(res.id==='edit')   this.edit = res.id;
    })
    // console.log("je suis la")
    await this.getuserByUsername();

    // if(this.userStorage.length>0 )   await this.getHistoriqueFormationsByParticipant();

  }
  patchUser() {
    console.log(this.newUser)
    this.userService.patchEmployee(this.newUser).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('profile');
      this.edit = ''
    })
  }
  getuserByUsername() {

    this.userService.getuserByUsername(this.userStorage.username).subscribe(async (data) => {
      this.user = await data;
      this.newUser = await data;
      // console.log(this.user);
    })
  }

}
