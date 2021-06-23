import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormFieldModule, InputsModule } from '@progress/kendo-angular-inputs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MultiCheckFilterComponent } from './multicheck-filter.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NotationComponent } from './notation/notation.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    UsersComponent,MultiCheckFilterComponent, NotationComponent, NotificationComponent
    ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ChartsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    InputsModule,
    NgbModule,
    ReactiveFormsModule,
    DropDownsModule,
    LabelModule,
    FormFieldModule,
    DialogModule, 
    FormsModule,
    DropDownsModule
  ]
})
export class UsersModule { }
