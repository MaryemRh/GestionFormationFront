import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { CampagneService } from 'src/app/shared/services/campagne.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { EntretienService } from 'src/app/shared/services/entretien.service';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {
  @ViewChild(DataBindingDirective, {static: false}) dataBinding: DataBindingDirective;


  public employees: any[];
  id: any;
  closeResult = '';
  state$: Observable<object>;
  public gridData: any[];
  public gridView: any[];
  public formGroup: FormGroup;
  public allowCustom = true;
  public directions: any[] = [];

  private editedRowIndex: number;
  public mySelection: string[] = [];
  private editedProduct: object;

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
        filter: {
            logic: 'or',
            filters: [
                {
                    field: 'matricule',
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
  constructor(private campagneService: CampagneService,
              private route: ActivatedRoute,
              private location: Location,
              private userService: UsersService,
              private modalService: NgbModal,
              private entretienService: EntretienService) {
                this.allData = this.allData.bind(this);
              }

  ngOnInit() {
    // console.log(this.location.getState());
    this.id = this.route.snapshot.paramMap.get('id');
    this.campagneService.getEntretienList(this.id).subscribe(
      data => {
        console.log(data);
        this.gridView = data;
        this.gridData = data;
      }
    );
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.gridData, { sort: [{ field: 'Etat', dir: 'asc' }] }).data,
    };

    return result;
}

  changerEtat(id: number) {
    if (confirm('Confirmer le changement ?')) {
        this.entretienService.changeStatus(id).subscribe();
        window.location.reload();
    }
}

cloturer(id: number) {
  if (confirm('Confirmer la clôture de la fiche ?')) {
    this.entretienService.cloturerEntretien(id).subscribe();
    window.location.reload();
}
}


cloturerEntretiens() {
  if (confirm('Confirmer la clôturation ?')) {
    this.entretienService.cloturerEntretiens(this.mySelection).subscribe();
    window.location.reload();
}
}

addEmployeesToCampagne() {
  console.log(this.mySelection);
  this.campagneService.lancerEAE(this.id, this.mySelection).subscribe(data => {
    window.location.reload();
  });
}

open(content) {
  this.userService.getEmployeeList().subscribe(data => {
    this.employees = data;
  });
  this.modalService.open(content, { size: 'xl' }).result.then((result) => {
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
}

}
