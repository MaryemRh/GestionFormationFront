import { UsersService } from "src/app/shared/services/users.service";
import { FormationService } from "src/app/shared/services/formation.service";
import { DemandeFormationService } from "./../../../shared/services/demande-formation.service";
import { TokenStorageService } from "src/app/shared/authentication/token-storage.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-formationsprofile",
  templateUrl: "./formationsprofile.component.html",
  styleUrls: ["./formationsprofile.component.css"],
})
export class FormationsprofileComponent implements OnInit {
  userStorage: any = [];
  user: any = [];
  formations: any = [];
  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UsersService,
    private formationService: FormationService,
    private demandeformationService: DemandeFormationService
  ) {
    this.userStorage = this.tokenStorage.getUser();
  }

  async ngOnInit() {
    // console.log(this.userStorage.username);
    await this.getuserByUsername();
  }
  getuserByUsername() {
    this.userService
      .getuserByUsername(this.userStorage.username)
      .subscribe(async (data) => {
        this.user = await data;
        this.getHistoriqueFormationsByParticipant(this.user.id);
        console.log(this.user);
      });
  }
  //  getHistoriqueFormationsByParticipant() {
  //   // console.log(this.user)
  //   this.demandeformationService.getDemandeFormationsByusers(this.user.username, this.user.username)
  //   .subscribe( res => {
  //     // this.formations=res;
  //     // console.log(res);

  //   })
  // }
  public getHistoriqueFormationsByParticipant(id) {
    // console.log(id)
    return this.formationService
      .getHistoriqueFormationsByParticipant(id)
      .subscribe((res) => {
        console.log(res);
        return (this.formations = res);
      });
  }
}
