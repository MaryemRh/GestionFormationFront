import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationComponent } from './evaluation.component';
import { FicheComponent } from './fiche/fiche.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [EvaluationComponent, FicheComponent, EvaluationListComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    FormsModule,
    GridModule, PDFModule, ExcelModule,
    InputsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class EvaluationModule { }
