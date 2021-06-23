import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activite } from 'src/app/shared/model/Activite';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css']
})
export class AddActiviteComponent implements OnInit {
  users:any;

  directionsList: any[];
  activite :any;

  public addActiviteForm: FormGroup = new FormGroup({
    nomActivite: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),
    direction: new FormControl({}),
  });

  constructor(private userService : UsersService, private directionService: DirectionService, private activiteService: ActiviteService) { }

  ngOnInit() {
    this.userService.getusers().subscribe((data)=>{
      console.log(data);
      this.users=data
  })
    this.directionService.getDirectionList().subscribe(data => { this.directionsList = data; });
  }

  submit() {
    // console.log(this.addActiviteForm.getRawValue().direction.id);
         // idDirection:number;
    this.activite = new Activite();
    console.log(this.addActiviteForm.getRawValue())
    this.activite = {...this.addActiviteForm.getRawValue()}
    this.activite ={"nomActivite":this.addActiviteForm.getRawValue().nomActivite,"direction": this.addActiviteForm.getRawValue().direction}
    console.log(this.activite)

    this.activiteService.createActivite(this.activite,this.addActiviteForm.getRawValue().responsable.username).subscribe(data => {
      
      window.location.reload();
    });
  }
}
