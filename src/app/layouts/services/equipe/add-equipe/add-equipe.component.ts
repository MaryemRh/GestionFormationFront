import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipe } from 'src/app/shared/model/Equipe';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { EquipeService } from 'src/app/shared/services/equipe.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.css']
})
export class AddEquipeComponent implements OnInit {
  users:any;
  activites:any;
  equipe :any;
  public addEquipeForm: FormGroup = new FormGroup({
    nomEquipe: new FormControl('', Validators.required),
    nomActivite: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
  });
  constructor(private userService : UsersService, private equipeService : EquipeService,private activteService : ActiviteService) { }

  ngOnInit() {
    this.userService.getusers().subscribe((data)=>{
        console.log(data);
        this.users=data
    })
    this.activteService.getActiviteList().subscribe((data)=>{
      this.activites = data
      console.log(this.activites)
    })
  }
  submit(){
    this.equipe = {"nomEquipe" :this.addEquipeForm.getRawValue().nomEquipe,"responsable" :this.addEquipeForm.getRawValue().responsable.username};
  console.log(this.addEquipeForm.getRawValue().nomActivite.nomActivite)
    this.equipeService.createEquipes(this.equipe,this.addEquipeForm.getRawValue().nomActivite.nomActivite).subscribe((data)=>{
      window.location.reload();

    })
  }
}
