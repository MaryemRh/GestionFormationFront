import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { DataBindingDirective, GridDataResult } from '@progress/kendo-angular-grid';
import { process, CompositeFilterDescriptor, distinct, State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { Formation} from 'src/app/shared/model/Formation';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { CollaborateurService } from 'src/app/shared/services/collaborateur.service';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { FormationService } from 'src/app/shared/services/formation.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  @ViewChild(DataBindingDirective, {static: true}) dataBinding: DataBindingDirective;
  public gridData: any[];
  public gridView: any[];
  public filter: CompositeFilterDescriptor;
  public formation: Formation =  new Formation();
  public collaborateurs : any[];
  closeResult = '';
  public mySelection: string[] = [];
  public submitted = false;
  public formateurName: string;
  public dateDebut : Date;
  public user: any = {};
  directions: any = [];
  equipes: any = [];
  roles: any = [];
  activites: any = [];
  isInscrit : boolean= false;

/////////////////////////////////////////////////
  [x: string]: any;

  public view: Observable<GridDataResult>;
  public formations: Formation[];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15
  };
  userActive:any=[]
  public formGroup: FormGroup;
  public allowCustom = true;

  private editedEmployee: Formation;
  private editedRowIndex: number;
  public editDataItem: Formation;
  public isNew: boolean;
 
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public lancedCampagneOpened = false;
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: any;
  userRole: any;
  removeIcon: 'k-icon k-i-delete';
  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'contains'
  };
  
////////////////////////////////////////////////////
  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    dateEmbauche: new FormControl('', Validators.required),
    direction: new FormControl({}),
    activite: new FormControl({}),
    equipe: new FormControl({}),
    responsable: new FormControl(''),
    role: new FormControl({})
  });


  constructor(private userService: UsersService,
              private collaborateurService : CollaborateurService,
              private formationService: FormationService,
              private modalService: NgbModal,
              private directionService: DirectionService,
              private activiteService: ActiviteService,
              private tokonStorage : TokenStorageService,
              private router: Router) { }

  public ngOnInit(): void {

    this.directionService.getDirectionList().subscribe(
      data => {
        this.directions = data;
      }
    );
    this.activiteService.getActiviteList().subscribe(data => {
      this.activites = data;
    });
    this.userService.getRoleList().subscribe(data => {
      this.roles = data;
    });
    this.formation = new Formation();
    // this.gridView = this.gridData;
    this.getAllFormations()
  }
  isUSER(){
  return this.tokonStorage.getUser().roles[0]==="ROLE_ROLE_USER" ? true:false

  }
getAllFormations(){
     this.formationService.getFormations().subscribe(data => {
      this.formations = data;
      console.log(data);
    });
}
  public onFilter(inputValue: string): void {
    this.formations = process(this.gridData, {
        filter: {
            logic: "or",
            filters: [
                  {
                    field: 'id',
                    operator: 'contains',
                      value: inputValue
                  },
                  {
                    field: 'code',
                    operator: 'contains',
                      value: inputValue
                  },
                  {
                    field: 'type',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'theme',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'organisme',
                    operator: 'contains',
                      value: inputValue
                  },
                  {
                    field: 'objectif',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'formateur',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'dateDebutFormation',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'dateClotureFormation',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'cout',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'nbrPlace',
                    operator: 'contains',
                    value: inputValue
                  },
                  {
                    field: 'status',
                    operator: 'contains',
                    value: inputValue
                  }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

 
  open(content, id) {
    this.collaborateurService.getallCollaborateurList().subscribe(data => {
      this.collaborateurs = data;
     // this.gridData = data;
      console.log(data);
    }, error => {
    });    
    this.formationService.getFormation(id).subscribe(data => {
      this.dateDebut = new Date();

      this.formation = data;
      console.log(data);
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    this.editForm.reset();
  }

  public synchroniser(): void {
    this.userService.synchroniserEmployee().subscribe(data => {
      window.location.reload();
    });
  }

  onUpdate() {
    // console.log(this.editForm.getRawValue());
    this.userService.updateEmployee(this.editForm.getRawValue()).subscribe(
      data => {
        // this.router.navigate(['/users']);
        window.location.reload();
        // console.log(data);
      }
    );
  }
  openScrollableContent(longContent) {
     this.collaborateurService.getallCollaborateurList().subscribe(data => {
       this.collaborateurs = data;
      // this.gridData = data;
       console.log(data);
     }, error => {
     });
    this.modalService.open(longContent, { size: "lg" });

  }
      onSubmit() {
            
        this.submitted = true;
        this.save();
        this.formation = {
          ...this.formation,
          formateur : this.formateurName
      }
        console.log("Formation :",this.formation);
        // this.submitted = true;
        // this.save();
      }
  save() {
    
    this.formation = {
      ...this.formation,formateur : this.formateurName
    }
    
    this.formationService.createFormation(this.formation).subscribe(
      data => {
        console.log(data)
         this.formation = new Formation();
         window.location.reload();
    },
    error => console.log(error));
  }
  public handleValueChange(value: any): void {
    this.formateurName = value.nom ;
}


onEdit(){
  this.submitted = true;

  console.log(this.formation)
  this.formation = {
    ...this.formation,formateur : this.formateurName
  }
  this.formationService.updateFormation(this.formation)
  .subscribe(data => {
    console.log(data);
    window.location.reload();
  }, error => console.log(error));
}

//////////////////////////////   delete  ////////////////////////////////
public opened = false;

public close() {
  
  //console.log(Dialog result: ${status});
  this.opened = false;
}

public openDialog() {
  this.opened = true;
}

public removeHandler(id): void {
  console.log(id);
  this.formationService.deleteFormation(id)
   .subscribe(data => {
   window.location.reload();
   this.close();
  });

}

  ////////////////////////////// Fin delete  ////////////////////////////////

  //////////////////////// Inscription ////////////////////////////

  @Input() nbrPlace: number; 
  @Output() nbrPlaceChange = new EventEmitter<number>(); 

  resize(delta: number) { 
    this.nbrPlace = +this.nbrPlace + delta;
  } 

  inscription(id){
    this.formationService.getFormation(id).subscribe(data => {
      this.dateDebut = new Date();

      this.formation = data;
      console.log(data);
    });
    console.log(this.formation)
    this.formation = {
      ...this.formation,
      isInscrit : this.isInscrit
  }
  console.log(this.formation)
  this.formation.isInscrit = true;
    this.formationService.inscriptionFormation(this.tokonStorage.getUser().username,id )
    .subscribe(data => {
      console.log(this.formation.isInscrit)
      this.formation.isInscrit = true;
      console.log(this.formation.isInscrit)

      console.log(data)
      this.formation.nbrPlace--;
    window.location.reload();
   });

  
  }
  /////////////////////////////////////////////////////////////

  goToListParticipant(id){
    this.router.navigate(['formations/listparticipants', id]);
  }
 

}
