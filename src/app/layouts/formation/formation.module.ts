import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationComponent } from './formation.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule, InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule } from '@angular/forms'; 
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ListParticipantsComponent } from './list-participants/list-participants.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { SessionComponent } from './session/session.component';
import { DemandeFormationComponent } from './demande-formation/demande-formation.component';
import { ListDemandeFormationComponent } from './list-demande-formation/list-demande-formation.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { HistoriqueComponent } from './historique/historique.component';


@NgModule({
  declarations: [
    FormationComponent,
   // MultiCheckFilterComponent,
    ListParticipantsComponent,
    SessionComponent,
    DemandeFormationComponent,
    ListDemandeFormationComponent,
    HistoriqueComponent,
    

  ],
  imports: [
    CommonModule,
    FormationRoutingModule,
    ChartsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    InputsModule,
    NgbModule,
    ReactiveFormsModule,
    LabelModule,
    FormFieldModule,
    FormsModule,
    DropDownsModule,
    DialogModule, 
     SchedulerModule,
    
  
  ]
})
export class FormationModule { }
