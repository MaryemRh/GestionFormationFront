import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeFormationComponent } from './demande-formation/demande-formation.component';
import { FormationComponent } from './formation.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ListParticipantsComponent } from './list-participants/list-participants.component';
import { SessionComponent } from './session/session.component';



const routes: Routes = [
  { path: '', redirectTo: 'formations', pathMatch: 'full' },
  { path: 'formations', component: FormationComponent },
  { path: 'demandeFormations', component: DemandeFormationComponent },
   { path: 'sessions', component: SessionComponent },
   { path: 'historique', component: HistoriqueComponent }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
