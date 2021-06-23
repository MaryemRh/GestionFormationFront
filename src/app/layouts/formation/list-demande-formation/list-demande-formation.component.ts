import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { process,State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/authentication/token-storage.service';
import { DemandeFormation } from 'src/app/shared/model/DemandeFormation';
import { DemandeFormationService } from 'src/app/shared/services/demande-formation.service';

@Component({
  selector: 'app-list-demande-formation',
  templateUrl: './list-demande-formation.component.html',
  styleUrls: ['./list-demande-formation.component.css']
})
export class ListDemandeFormationComponent implements OnInit {

  public listItems: Array<string> = ['Accepter', 'Refuser', 'Remplacer'];
  [x: string]: any;


  public view: Observable<GridDataResult>;
  public demandeFormation: DemandeFormation[];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15
  };
  public gridData: any[];
  public gridView: any[];
  public mySelection: string[] = [];
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes = true;
  public previousNext = true;
  public opened = false;
  public demandeForm :any;
  public yes :any = 'yes';
  public no :any = 'no';
  public currentUser : string;

  constructor(private tokenStorage :TokenStorageService, private demandeFormationService: DemandeFormationService,public router: Router) {}


  public ngOnInit(): void {
      
      // this.demandeFormationService.getDemandeFormations().subscribe(data => {
      //       this.demandeFormation = data;
      //       this.gridData = data;
      //       console.log(this.demandeFormation);
      //     }, error => {
      //     });
      this.currentUser = this.tokenStorage.getUser().username;
          this.demandeFormationService.getDemandeFormationsByusers(this.tokenStorage.getUser().username,
          this.tokenStorage.getUser().username).subscribe((data) => {
            this.demandeFormation = data;
            this.gridData = data;
            console.log(data)
          })
      }
      isUSER(){
        return this.tokenStorage.getUser().roles[0]==="ROLE_ROLE_USER" ? true:false
      
        }
      public valueChange(_status: string ,_id: Number): void {
       // console.log('valueChange: ', _status,_id);
        const toUpdate = { id: _id,status:_status};
        this.demandeFormationService.updateDemandeFormation(toUpdate).subscribe(data => {
          console.log(data);
        });
      }

      public onStateChange(state: State) {
        this.gridState = state;
        this.demandeFormationService.getDemandeFormations().subscribe();
      }

      public removeHandler({ dataItem }): void {
        this.demandeFormationService.deleteDemandeFormation(dataItem.id)
         .subscribe(data => {
          window.location.reload();
        });

      }
      public onFilter(inputValue: string): void {
        this.demandeFormation = process(this.gridData, {
          filter: {
            logic: 'or',
            filters: [
              {
                field: 'status',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'priorite',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'dateEmission',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'besoins',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'titre',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'description',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'theme',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'activite',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'equipe',
                operator: 'contains',
                value: inputValue
              },
              {
                field: 'direction',
                operator: 'contains',
                value: inputValue
              }
            ]
          }
        }).data;
      }

      public openDialog(rowValue) {
        this.opened = true;
        this.demandeForm =rowValue;
        console.log(rowValue)

      }

      public close() {
    
        //console.log(Dialog result: ${status});
        this.opened = false;
      }
      public approuveFormation(ch : string): void {
        console.log(ch)
        console.log(this.demandeForm.titre)
         this.demandeFormationService.approuveDemandeFormation(this.tokenStorage.getUser().username,this.demandeForm.titre,ch).subscribe(data =>{
           console.log(data)
           window.location.reload()
         })
      }
}