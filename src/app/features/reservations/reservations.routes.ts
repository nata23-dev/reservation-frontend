import { Routes } from '@angular/router';

export const reservationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/reserva-list/reserva-list.component').then(
        (m) => m.ReservaListComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/reserva-form/reserva-form.component').then(
        (m) => m.ReservaFormComponent,
      ),
  },
];
