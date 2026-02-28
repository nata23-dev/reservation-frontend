import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reservations',
    loadChildren: () =>
      import('./features/reservations/reservations.routes').then(
        (m) => m.reservationsRoutes,
      ),
  },
  { path: '', redirectTo: 'reservations', pathMatch: 'full' },
];
