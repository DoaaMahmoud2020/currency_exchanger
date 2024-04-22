import { Routes } from '@angular/router';
export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./components/home.component').then((c) => c.HomeComponent);
    },
  },
];
