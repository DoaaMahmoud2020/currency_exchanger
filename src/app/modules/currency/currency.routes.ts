import { Routes } from '@angular/router';
export const currencyRoutes: Routes = [
  {
    path: 'currency',
    loadComponent() {
      return import('./components/currency.component').then(
        (c) => c.CurrencyComponent
      );
    },
  },
  {
    path: 'currency-details',
    loadComponent() {
      return import(
        './components/currency-details/currency-details.component'
      ).then((c) => c.CurrencyDetailsComponent);
    },
  },
];
