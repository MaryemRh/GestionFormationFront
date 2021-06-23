import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeFormationComponent } from './formation/demande-formation/demande-formation.component';
import { HistoriqueComponent } from './formation/historique/historique.component';
import { ListDemandeFormationComponent } from './formation/list-demande-formation/list-demande-formation.component';
import { ListParticipantsComponent } from './formation/list-participants/list-participants.component';
import { SessionComponent } from './formation/session/session.component';

import { LayoutsComponent } from './layouts.component';
import { NotationComponent } from './users/notation/notation.component';
import { NotificationComponent } from './users/notification/notification.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard], data: {
          expectedRole: 'ROLE_ROLE_ADMIN'
        }
      },
      {
        path: 'evaluation', loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:id', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      }, 
      {
        path: 'formations', loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule),
        canActivate: [AuthGuard]
      }, 
      {
        path: 'formations/listparticipants/:id', component: ListParticipantsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sessions', component: SessionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'demandeFormations', component: DemandeFormationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ListDemandeFormations', component: ListDemandeFormationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'historique', component: HistoriqueComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notation', component: NotationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notification', component: NotificationComponent,
        canActivate: [AuthGuard]
      },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutsRoutingModule { }
