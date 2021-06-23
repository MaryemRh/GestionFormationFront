import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PosteService } from 'src/app/shared/services/poste.service';

@Component({
  selector: 'app-edit-poste',
  templateUrl: './edit-poste.component.html',
  styleUrls: ['./edit-poste.component.css']
})
export class EditPosteComponent implements OnInit {
  @Input() poste;
  users: any;
  postes:any;
  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nomPoste: new FormControl('', Validators.required)
  });

  constructor(private posteService : PosteService) { }

  ngOnInit() {
    this.editForm.get('id').setValue(this.poste.id);
    this.editForm.get('nomPoste').setValue(this.poste.nomEquipe);
    
    console.log(this.editForm)
    console.log(this.poste)
  }

  submit(){
    this.postes = {...this.editForm.getRawValue()};

    console.log(this.postes)
    this.posteService.updatePoste(this.postes).subscribe(
      data => {
         console.log(data);
        window.location.reload();
      }
    );


    /* this.poste = {"id":this.editForm.getRawValue().id,
                  "nomPoste" :this.editForm.getRawValue().nomPoste};
    console.log(this.poste);
    this.posteService.updatePoste(this.poste).subscribe((data)=>{
      window.location.reload();

    }) */
  }
}
