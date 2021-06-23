import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
//import { NotificationService } from '@progress/kendo-angular-notification';
import { process, CompositeFilterDescriptor, distinct } from '@progress/kendo-data-query';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { ActiviteService } from 'src/app/shared/services/activite.service';
import { DirectionService } from 'src/app/shared/services/direction.service';
import { FormationService } from 'src/app/shared/services/formation.service';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.css']
})
export class ListParticipantsComponent implements OnInit {
  @ViewChild(DataBindingDirective, {static: true}) dataBinding: DataBindingDirective;
  public gridData: any[];
  public gridView: any[];
  public filter: CompositeFilterDescriptor;

  closeResult = '';
  public mySelection: string[] = [];

  public user: any = {};
  directions: any = [];
  equipes: any = [];
  roles: any = [];
  activites: any = [];
  participants : any ;

  public editForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    matricule: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    dateEmbauche: new FormControl('', Validators.required),
    direction: new FormControl({}),
    activite: new FormControl({}),
    equipe: new FormControl({}),
    responsable: new FormControl(''),
    role: new FormControl({})
  });

formationId:any
  constructor(private userService: UsersService,
              private modalService: NgbModal,
              private directionService: DirectionService,
              private activiteService: ActiviteService,
              private formationService : FormationService,
              private route: ActivatedRoute,
              //private notificationService:NotificationService,
              private tokenStorage : TokenStorageService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(res=>{
     this.formationId= res.id
    })  
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
    this.getAllFormationsById()
    // this.gridView = this.gridData;
  }
  getAllFormationsById(){
    
  this.formationService.getAllParticipantsById(this.formationId).subscribe(data => {
      this.gridView = data
      console.log(data)
    })
    
  }
  public onFilter(inputValue: string): void {
      this.gridView = process(this.gridView, {
          filter: {
              logic: 'or',
              filters: [
                  {
                      field: 'full_name',
                      operator: 'contains',
                      value: inputValue
                  },
                  {
                      field: 'job_title',
                      operator: 'contains',
                      value: inputValue
                  },
                  {
                      field: 'budget',
                      operator: 'contains',
                      value: inputValue
                  },
                  {
                      field: 'phone',
                      operator: 'contains',
                      value: inputValue
                  },
                  {
                      field: 'address',
                      operator: 'contains',
                      value: inputValue
                  }
              ],
          }
      }).data;

      this.dataBinding.skip = 0;
  }

  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.userService.getEmployee(id).subscribe(data => {
      console.log(data);
      this.user = data;
      this.editForm.reset(data);
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
        // window.location.reload();
        // console.log(data);
      },(err)=>{
        console.log(err);
        alert(err)
        
      }
    );
  }

  makeUserApproved(){
    let formationId = this.route.snapshot.paramMap.get('id');
    this.formationService.approveFormation(this.tokenStorage.getUser().username,formationId).subscribe(data => {
      // console.log(data)

      // window.location.reload();
      // this.notificationService.show({
      //   content: "Your data has been saved. Time for tea!",
      //   cssClass: "button-notification",
      //   animation: { type: "slide", duration: 400 },
      //   position: { horizontal: "center", vertical: "bottom" },
      //   type: { style: "success", icon: true },
      //   closable: true,
      // });
    this.getAllFormationsById()
    }, error => {
     /*  this.notificationService.show({
        content: "Your data has been saved. Time for tea!",
        cssClass: "button-notification",
        animation: { type: "slide", duration: 400 },
        position: { horizontal: "center", vertical: "bottom" },
        type: { style: "success", icon: true },
        closable: true,
      }); */
alert(error.error.message)
      console.log('errpr',error)
    });
  }
}
