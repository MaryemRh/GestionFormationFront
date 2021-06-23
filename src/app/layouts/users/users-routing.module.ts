import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotationComponent } from './notation/notation.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'notation', component: NotationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
