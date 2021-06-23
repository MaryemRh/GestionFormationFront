import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { DirectionComponent } from './direction/direction.component';
import { AddDirectionComponent } from './direction/add-direction/add-direction.component';
import { EditDirectionComponent } from './direction/edit-direction/edit-direction.component';
import { ActiviteComponent } from './activite/activite.component';
import { AddActiviteComponent } from './activite/add-activite/add-activite.component';
import { EditActiviteComponent } from './activite/edit-activite/edit-activite.component';
import { EquipeComponent } from './equipe/equipe.component';
import { AddEquipeComponent } from './equipe/add-equipe/add-equipe.component';
import { EditEquipeComponent } from './equipe/edit-equipe/edit-equipe.component';
import { PosteComponent } from './poste/poste.component';
import { EditPosteComponent } from './poste/edit-poste/edit-poste.component';
import { AddPosteComponent } from './poste/add-poste/add-poste.component';
import { DisplayActivitiesComponent } from './direction/display-activities/display-activities.component';
import { DisplayEquipeComponent } from './activite/display-equipe/display-equipe.component';


@NgModule({
  declarations: [
    ServicesComponent,
    DirectionComponent,
    AddDirectionComponent,
    EditDirectionComponent,
    ActiviteComponent,
    AddActiviteComponent,
    EditActiviteComponent,
    EquipeComponent,
    AddEquipeComponent,
    EditEquipeComponent,
    PosteComponent,
    EditPosteComponent,
    AddPosteComponent,
    DisplayActivitiesComponent,
    DisplayEquipeComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }
