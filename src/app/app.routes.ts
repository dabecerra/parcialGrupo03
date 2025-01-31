import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/coffee/coffee.routes').then((r) => r.routes),
  },
];
