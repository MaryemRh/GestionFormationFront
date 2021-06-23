import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { DataBindingDirective, GridDataResult } from '@progress/kendo-angular-grid';
import { process,State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Activite } from 'src/app/shared/model/Activite';
import { Formation } from 'src/app/shared/model/Formation';
import { FormationService } from 'src/app/shared/services/formation.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

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


  formations: Observable<HistoriqueComponent[]>;
  toastr: any;
  formation : Formation[] ;
 
  p: number=1;

 

  constructor(private formationService: FormationService) { 
    
  }

  
  public ngOnInit(): void {
    console.log("ccccccccccccccccccc");
    this.formationService.getHistoriqueFormations().subscribe(data => {
      this.formation = data;
      this.gridData = data;
      console.log(data);
    }, error => {
    });
}

public onStateChange(state: State) {
  this.gridState = state;
  this.formationService.getHistoriqueFormations().subscribe();
}

public onFilter(inputValue: string): void {
  this.formation = process(this.gridData, {
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


}
