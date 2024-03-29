import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'hr',
    loadChildren: () =>
      import('../modules/hr/hr.module').then((m) => m.HrModule)
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('../modules/employees/employees.module').then((m) => m.EmployeesModule)
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('../modules/customers/cutomers.module').then((m) => m.CustomerModule)
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('../modules/permissions/permissions.module').then(m => m.PermissionsModule)
  },
  {
    path: 'operation',
    loadChildren: () =>
      import('../modules/operations/operations.module').then(m => m.OperationsModule)
  }, {
    path: 'statistic',
    loadChildren: () =>
      import('../modules/statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: 'share',
    loadChildren: () =>
      import('../modules/share/share.module').then((m) => m.shareModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
