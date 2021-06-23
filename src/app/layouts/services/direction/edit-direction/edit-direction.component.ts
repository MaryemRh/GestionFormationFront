import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Direction } from 'src/app/shared/model/Direction';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-edit-direction',
  templateUrl: './edit-direction.component.html',
  styleUrls: ['./edit-direction.component.css']
})
export class EditDirectionComponent implements OnInit {

  @Input() direction;
  direct : any;
  users : any;
  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nomDirection: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),

  });
  constructor(private userService : UsersService, private directionService: DirectionService) { }

  ngOnInit() {
    this.editForm.get('id').setValue(this.direction.id);
    this.editForm.get('nomDirection').setValue(this.direction.nomDirection);
    this.userService.getusers().subscribe(data => {
      this.users = data
    })
    console.log(this.editForm)
  }

  public submit() {
    this.direct = {...this.editForm.getRawValue()};

    console.log(this.direct)
    this.directionService.updateDirection(this.direction.id,this.direct,this.direct.responsable.username).subscribe(
      data => {
         console.log(data);
        window.location.reload();
      }
    );
  }
}
