import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard';
import { PartnerComponent } from './pages/partner/partner.component';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [roleGuard(['ADMIN'])],
    children: [
      { path: '', loadComponent: () => import('./pages/admin/components/admin-home/admin-home.component').then(m => m.AdminHomeComponent) },
      { path: 'partners', loadComponent: () => import('./pages/admin/components/admin-partners/admin-partners.component').then(m => m.AdminPartnersComponent) },
      { path: 'boats', loadComponent: () => import('./pages/admin/components/admin-boats/admin-boats.component').then(m => m.AdminBoatsComponent) },
      { path: 'moorings', loadComponent: () => import('./pages/admin/components/admin-moorings/admin-moorings.component').then(m => m.AdminMooringsComponent) },
      { path: 'zones', loadComponent: () => import('./pages/admin/components/admin-zones/admin-zones.component').then(m => m.AdminZonesComponent) },
      { path: 'employees', loadComponent: () => import('./pages/admin/components/admin-employees/admin-employees.component').then(m => m.AdminEmployeesComponent) }
    ]
  },
  {
    path: 'employee',
    loadComponent: () => import('./pages/employee/employee.component').then(m => m.EmployeeComponent),
    canActivate: [roleGuard(['EMPLOYEE'])],
  },
  { path: 'partner', component: PartnerComponent, canActivate: [roleGuard(['PARTNER'])] },
];
