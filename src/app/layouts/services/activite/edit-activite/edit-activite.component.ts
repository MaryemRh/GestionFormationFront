import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activite } from 'src/app/shared/model/Activite';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-edit-activite',
  templateUrl: './edit-activite.component.html',
  styleUrls: ['./edit-activite.component.css']
})
export class EditActiviteComponent implements OnInit {

  directionsList: any[];
  acti : any;
  @Input() activite;
  users: any;

  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nomActivite: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    directionName: new FormControl({}),
  });

  constructor(private userService : UsersService ,private activiteService: ActiviteService, private directionService: DirectionService) { }

  ngOnInit() {
    this.userService.getusers().subscribe((data)=>{
      this.users = data;
    })
    console.log(this.activite);
    this.directionService.getDirectionList().subscribe(data => { this.directionsList = data; });
    this.editForm.get('id').setValue(this.activite.id);
    this.editForm.get('nomActivite').setValue(this.activite.nomActivite);
  }

  public submit() {
    this.acti = {id : this.editForm.getRawValue().id,nomActivite:this.editForm.getRawValue().nomActivite,directionName : this.editForm.getRawValue().directionName}
    console.log(this.acti )
    console.log(this.editForm.getRawValue())
    this.activiteService.updateActivite(this.acti.id,this.acti,this.editForm.getRawValue().responsable.username).subscribe(
      data => {
        // console.log(data);
        window.location.reload();
      }
    );
  }

}
