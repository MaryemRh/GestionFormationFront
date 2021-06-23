import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { DataBindingDirective, GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { Poste } from 'src/app/shared/model/Poste';
import { PosteService } from 'src/app/shared/services/poste.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css']
})
export class PosteComponent implements OnInit {

  [x: string]: any;
  @ViewChild(DataBindingDirective, {static: true}) dataBinding: DataBindingDirective;
  
  public view: Observable<GridDataResult>;
  //public activite: Activite[];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15
  };
  public gridData: any[];
  public gridView: any[];
  public formGroup: FormGroup;
  public allowCustom = true;

  public mySelection: string[] = [];
  public filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'contains'
  };
  public postes: any[];
 // postes: Observable<PosteComponent[]>;
  searchTerm: string;
  page = 1;
  pageSize = 4;
  postesSize: number;
  public postesList: any[];
  posteObject: any;
  closeResult = '';
  pagePoste = 1;

  constructor(private posteService: PosteService,
              private router: Router,
              private modalService: NgbModal) { }

   ngOnInit() {
      this.posteService.getPosteList().subscribe(data => {
        this.postesSize = data.length;
        this.postes = data;
        console.log(this.postes)
        this.postesList = this.postes;
      });
    }

    
    open(content, poste) {
      this.posteObject = poste;
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
  }









/* 


    reloadData() {
      this.posteService.getPosteList().subscribe(data => {
        this.poste = data;
        this.gridData = data;
        console.log(data);
      }, error => {
      });
    }
    public onStateChange(state: State) {
      this.gridState = state;
      this.posteService.getPosteList().subscribe();
    }

    public removeHandler({ dataItem }): void {
      this.posteService.deletePoste(dataItem.id)
       .subscribe(data => {
        window.location.reload();
      });
    }

    deletePostes(id: number) {
      this.posteService.deletePoste(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  
    updatePostes(id: number){
      this.router.navigate(['updatePoste', id]);
    }
 
    
gotoList() {
  this.router.navigate(['createPoste']);
}

public getemployeesPoste(id: number){
  this.router.navigate(['employeesPoste', id]);
  console.log(id);
}

public onFilter(inputValue: string): void {
  this.poste = process(this.gridData, {
      filter: {
          logic: "or",
          filters: [
                {
                  field: 'idPoste',
                  operator: 'contains',
                    value: inputValue
                },
                {
                  field: 'nomPoste',
                  operator: 'contains',
                    value: inputValue
                }
      ],
    }
  }).data;
  
  this.dataBinding.skip = 0;
}
 */

}
