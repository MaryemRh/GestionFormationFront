import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FormationModule } from './formation/formation.module';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { NotationComponent } from './users/notation/notation.component';
import { UsersModule } from './users/users.module';






@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    NavbarComponent
    
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    FormationModule,
    SchedulerModule,
    ButtonsModule,
    DropDownsModule,
    InputsModule,
    UsersModule
    
    
  ]
})
export class LayoutsModule { }
