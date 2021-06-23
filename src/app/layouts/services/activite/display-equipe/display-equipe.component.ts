import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Activite } from 'src/app/shared/model/Activite';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { EquipeService } from 'src/app/shared/services/equipe.service';

@Component({
  selector: 'app-display-equipe',
  templateUrl: './display-equipe.component.html',
  styleUrls: ['./display-equipe.component.css']
})
export class DisplayEquipeComponent implements OnInit {
  @Input() equipe;
   activiteEquipes: Observable<DisplayEquipeComponent[]>;

   searchTerm: string;
   page = 1;
   pageActivite = 1;
   pageSize = 6;
   directionsSize: number;
 
   closeResult = '';
   public directions: any[];
   public directionsList: any[];
   directionObject: any;
  
   public displayActivityForm: FormGroup = new FormGroup({
     id: new FormControl('', Validators.required),
   });
   public  directionActivity:Activite[];
   toastr: any;
   p: number=1;
   id:number;
  constructor(private activiteService: ActiviteService, private modalService: NgbModal) { }

  ngOnInit() {
   console.log(this.equipe.nomActivite)
    this.activiteService.getEquipesByActivite(this.equipe.nomActivite)
       .subscribe(data => {
         console.log(data);
        this.activiteEquipes = data;
        console.log(this.activiteEquipes);

       }, error => console.log(error));
      }
   

  

}
