import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputsModule, FormFieldModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormationsprofileComponent } from './formationsprofile/formationsprofile.component';
import { ExperienceComponent } from './experience/experience.component';


@NgModule({
  declarations: [ProfileComponent, FormationsprofileComponent, ExperienceComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ChartsModule,
    GridModule,
    InputsModule,
    NgbModule,
    ReactiveFormsModule,

    LabelModule,
    FormFieldModule,
    DialogModule,
    DropDownsModule
  ]
})
export class ProfileModule { }
