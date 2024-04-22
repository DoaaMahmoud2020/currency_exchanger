import { Routes } from '@angular/router';
import { homeRoutes } from './modules/home/home.routes';
import { currencyRoutes } from './modules/currency/currency.routes';

export const routes: Routes = [...homeRoutes, ...currencyRoutes];
