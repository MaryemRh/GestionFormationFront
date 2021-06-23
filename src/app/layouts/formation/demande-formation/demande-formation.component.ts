import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { DemandeFormation } from 'src/app/shared/model/DemandeFormation';
import { DemandeFormationService } from 'src/app/shared/services/demande-formation.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-demande-formation',
  templateUrl: './demande-formation.component.html',
  styleUrls: ['./demande-formation.component.css']
})
export class DemandeFormationComponent implements OnInit {
  users :any ;
  username:String;

  submitted = false;
 demandeFormation : DemandeFormation = new DemandeFormation();

  constructor(private tokenStorageService :TokenStorageService ,private demandeFormationService: DemandeFormationService, private router: Router,
              private usersService : UsersService) { }


  gotoList() {
    this.router.navigate(['/demandeFormations']);

  }
  ngOnInit() {
    this.usersService.getusers().subscribe((data)=>{
      console.log(data);
      this.users=data;
    })
    this.submitted = false;
    console.log(this.tokenStorageService.getUser().username)
  }

  save() {
    this.demandeFormation = {...this.demandeFormation, nomUser : this.tokenStorageService.getUser().username}
    console.log(this.demandeFormation)

    this.demandeFormationService.createDemandeFormation(this.demandeFormation)
      .subscribe(data => {
            console.log(data)
            window.location.reload()
      }, 
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

}
