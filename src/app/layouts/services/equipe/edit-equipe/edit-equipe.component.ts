import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { EquipeService } from 'src/app/shared/services/equipe.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-edit-equipe',
  templateUrl: './edit-equipe.component.html',
  styleUrls: ['./edit-equipe.component.css']
})
export class EditEquipeComponent implements OnInit {
  @Input() equipe;
  users: any;
  activites:any;
  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nomEquipe: new FormControl('', Validators.required),
    nomActivite: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    //directionName: new FormControl({}),
  });
  constructor(private equipeService : EquipeService,private userService :UsersService,private activteService : ActiviteService) { }

  ngOnInit() {
    this.editForm.get('id').setValue(this.equipe.id);
    this.editForm.get('nomEquipe').setValue(this.equipe.nomEquipe);
    this.userService.getusers().subscribe((data)=>{
      this.users = data
    })
    this.activteService.getActiviteList().subscribe((data)=>{
      this.activites = data
      console.log(this.activites)
    })
    console.log(this.editForm)
    console.log(this.equipe)
  }

  submit(){
    this.equipe = {"id":this.editForm.getRawValue().id,"nomEquipe" :this.editForm.getRawValue().nomEquipe,"responsable" :this.editForm.getRawValue().responsable};
    console.log(this.editForm.getRawValue().nomActivite.nomActivite)
    console.log(this.equipe)
    let nomActivite  =this.editForm.getRawValue().nomActivite.nomActivite
  let username = this.editForm.getRawValue().responsable
    this.equipeService.updateEquipes(this.equipe,nomActivite,username).subscribe((data)=>{
      window.location.reload();

    })
  }

}
