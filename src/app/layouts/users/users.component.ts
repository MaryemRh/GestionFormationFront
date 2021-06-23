import { TokenStorageService } from './../../shared/authentication/token-storage.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { process, CompositeFilterDescriptor, distinct } from '@progress/kendo-data-query';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormsModule } from '@angular/forms';

import { DataBindingDirective, FilterService, GridDataResult } from '@progress/kendo-angular-grid';
import {  State } from '@progress/kendo-data-query';
import { Observable, Subject } from 'rxjs';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { Router } from '@angular/router';
import { filterBy, FilterDescriptor} from '@progress/kendo-data-query';
import { User } from 'src/app/shared/model/User';
import { EquipeService } from 'src/app/shared/services/equipe.service';
import { PosteService } from 'src/app/shared/services/poste.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  [x: string]: any;
  userActive:any=[]
  @ViewChild(DataBindingDirective, {static: true}) dataBinding: DataBindingDirective;
  public view: Observable<GridDataResult>;
 // public employees: Collaborateur[];
 public gridState: State = {
  sort: [],
  skip: 0,
  take: 15
};
  public gridData: any[];
  public gridView: any[];
  public formGroup: FormGroup;
  public mySelection: string[] = [];
  public isNew: boolean;
  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'contains'
  };
  public lancedCampagneOpened = false;
  employee: Observable<UsersComponent[]>;
  toastr: any;
  public employees : User[] ;
  public user: User =  new User();
  closeResult = '';
  public submitted = false;
  public allowCustom = true;
  public editDataItem: User;
  public buttonCount = 5;
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public removeConfirmationSubject: Subject<boolean> = new Subject<boolean>();
  public itemToRemove: any;
  removeIcon: 'k-icon k-i-delete';


/*
  public editForm: FormGroup = new FormGroup({

    id: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    dateEmbauche: new FormControl('', Validators.required),
    equipe: new FormControl({}),
    poste: new FormControl({})
  }); */

  public equipeList : any[];
  public posteList : any[];
  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  //--------------------------

  constructor(private equipeService :EquipeService,
    private posteService :PosteService,
     private collaborateurService: UsersService,
     public router: Router,
     private modalService: NgbModal,
     private tokonStorage:TokenStorageService,
     filterService: FilterService    ) {}

  public ngOnInit(): void {

        this.equipeService.getEquipesList().subscribe(data=>{
          this.equipeList = data;
        })
        this.posteService.getPosteList().subscribe(data=>{
          this.posteList = data;
        })
          this.collaborateurService.getEmployeeList().subscribe(data => {
            this.employees = data;
            this.gridData = data;
            console.log(data);
          }, error => {
          });
          this.user = new User();

         // this.employees_Origin = [...this.employees];
      //-------------------------

          //  this.Administrateur = false;
          //  this.Manager = false;
          //  this.User = false;
          //  this.Directeur = false;
      //-------------------------
      }
      isUSER(){
        return this.tokonStorage.getUser().roles[0]==="ROLE_ROLE_USER" ? true:false

        }
      public onStateChange(state: State) {
        this.gridState = state;

        this.collaborateurService.getEmployeeList().subscribe();
      }

    updateCollaborateur(id: number){
      this.router.navigate(['updateCollaborateur', id]);
    }

    demandeFormationByUser(id: number){
      this.router.navigate(['demandeFormationByUser', id]);
    }

      gotoList() {
        this.router.navigate(['users']);
      }

      public onFilter(inputValue: string): void {
        this.employees = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                      {
                        field: 'id',
                        operator: 'contains',
                          value: inputValue
                      },
                      {
                        field: 'username',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'password',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'matricule',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'email',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'nom',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'prenom',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'telephone',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'dateEmbauche',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'dateDepart',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'actif',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'roles',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'nomPoste',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'nomEquipe',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'nomActivite',
                        operator: 'contains',
                        value: inputValue
                      },
                      {
                        field: 'nomDirection',
                        operator: 'contains',
                        value: inputValue
                      }
            ],
          }}).data;
        this.dataBinding.skip = 0;
      }

         public filterChange(filter: CompositeFilterDescriptor): void {
          this.filter = filter;
          this.gridData = filterBy(this.employees, filter);
      }

      public distinctPrimitive(fieldName: string): any {
        return distinct(this.employees, fieldName).map(item => item[fieldName]);
      }

      openScrollableContent(longContent) {
        // this.collaborateurService.getallCollaborateurList().subscribe(data => {
        //   this.collaborateurs = data;
        //  // this.gridData = data;
        //   console.log(data);
        // }, error => {
        // });
        console.log(longContent)
       this.modalService.open(longContent, { size: "lg" });

     }
     onSubmit() {

      this.submitted = true;
      this.collaborateurService.createEmployee(this.user).subscribe(data=>{
        console.log(data)
        window.location.reload();
      })
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
        this.collaborateurService.deleteEmployee(id)
        .subscribe(data => {
        window.location.reload();
        this.close();
        });

      }

  ////////////////////////////// Fin delete  ////////////////////////////////

  //////////////////////////////   Update  ////////////////////////////////
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    console.log(this.id);
    this.collaborateurService.getEmployeeId(id).subscribe(data => {
      this.user = data;
      console.log(this.user);
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
  onEdit(){
    this.submitted = true;
    this.collaborateurService.updateEmployee(this.user)
    .subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => console.log(error));
  }


   ////////////////////////////// Fin Update  ////////////////////////////////
}
