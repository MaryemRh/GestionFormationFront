import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PosteService } from 'src/app/shared/services/poste.service';

@Component({
  selector: 'app-add-poste',
  templateUrl: './add-poste.component.html',
  styleUrls: ['./add-poste.component.css']
})
export class AddPosteComponent implements OnInit {

  users:any;
  poste :any;
  public addPosteForm: FormGroup = new FormGroup({
    nomPoste: new FormControl('', Validators.required)
  });
  
  constructor(private posteService : PosteService,) { }

  ngOnInit() {
    this.posteService.getPosteList().subscribe((data)=>{
        console.log(data);
        this.users=data
    });
  }
  submit(){
    this.poste = {"nomPoste" :this.addPosteForm.getRawValue().nomPoste};
  
    this.posteService.createPoste(this.poste).subscribe((data)=>{
      window.location.reload();

    })
  }
}

