import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { DataBindingDirective, GridDataResult } from '@progress/kendo-angular-grid';
import { FilterDescriptor,CompositeFilterDescriptor, distinct, filterBy, process, State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/User';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})
export class NotationComponent implements OnInit {

  [x: string]: any;
  @ViewChild(DataBindingDirective, {static: true}) dataBinding: DataBindingDirective;
  public view: Observable<GridDataResult>;
 // public employees: Collaborateur[];
 public filter: CompositeFilterDescriptor;

  public gridState: State = {sort: [],skip: 0,take: 15};
  public gridData: any[];
  public gridView: any[];
  public formGroup: FormGroup;
  public allowCustom = true;
  public mySelection: string[] = [];
  public isNew: boolean;
  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'contains'
  };

  employee: Observable<NotationComponent[]>;
  toastr: any;
  employees : User[] ;

  public user: User =  new User();
  closeResult = '';
  public submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService,
              private modalService: NgbModal ) { this.gridView = this.gridData;}

    ngOnInit() {

      this.userService.getEmployeeList().subscribe(data => {
        this.employees = filterBy(data, this.filter);
        this.gridData = data;
        console.log(data);
      }, error => {
      });

/* 
      this.userService.getEmployeeList().subscribe(data => {
          console.log(data)
          this.employees = data;
        }, error => console.log(error)); */
    }

    public onStateChange(state: State) {
      this.gridState = state;

      this.collaborateurService.getEmployeeList().subscribe();
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

    //////////////////////////////   Update  ////////////////////////////////
  open(content, id) {

     this.userService.getEmployeeId(id).subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user);
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

  onEdit(){
    
    //this.user = new User();
    this.submitted = true;
    this.userService.updateEmployee(this.user)
    .subscribe(data => {
      console.log(data);
      window.location.reload();
    }, error => console.log(error));
  }


   ////////////////////////////// Fin Update  ////////////////////////////////

   public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridData = filterBy(this.employees, filter);
  }

  public distinctPrimitive(fieldName: string): any {
    return distinct(this.employees, fieldName).map(item => item[fieldName]);
  }
 
}
