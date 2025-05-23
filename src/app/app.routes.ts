import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/dashboard/reports/reports.component';
import { UsersComponent } from './pages/dashboard/users/users.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
