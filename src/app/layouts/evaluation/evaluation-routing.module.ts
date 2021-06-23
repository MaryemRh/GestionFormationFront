import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { EvaluationComponent } from './evaluation.component';
import { FicheComponent } from './fiche/fiche.component';


const routes: Routes = [
  {path: '', component: EvaluationComponent},
  {path: ':id/fiche/:idEntretien', component: FicheComponent},
  {path: ':id', component: EvaluationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
