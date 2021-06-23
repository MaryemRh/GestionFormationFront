import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Direction } from 'src/app/shared/model/Direction';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-direction',
  templateUrl: './add-direction.component.html',
  styleUrls: ['./add-direction.component.css']
})
export class AddDirectionComponent implements OnInit {
  users:any;

  direction : Direction;
  public addDirectionForm: FormGroup = new FormGroup({
    nomDirection: new FormControl('', Validators.required),
    responsable: new FormControl('', Validators.required),

  });

  constructor(private userService : UsersService,private directionService: DirectionService, private modalService: NgbModal) { }

  ngOnInit() { 
    this.userService.getusers().subscribe((data)=>{
      console.log(data);
      this.users=data
  })
  }

  public submit() {
    this.direction = {...this.addDirectionForm.getRawValue().direction};
    
    this.directionService.createDirection(this.addDirectionForm.getRawValue(),this.addDirectionForm.getRawValue().responsable.username).subscribe(
      data => {
        // console.log(data);
        window.location.reload();
      }
    );
  }
}
