import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/authentication/auth.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { FilterService, GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { NotificationModule } from '@progress/kendo-angular-notification';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogsModule,
    SchedulerModule,
    GridModule,
    ButtonsModule,
    DropDownsModule,
    InputsModule,
    ChartsModule

  ],
  providers: [AuthGuard,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
