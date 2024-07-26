import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/home/home.routes').then((m) => m.HomeRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/login/login.routes').then((m) => m.LoginRoutes),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./core/sign-up/sign-up.routes').then((m) => m.SignUpRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./core/products/products.routes').then((m) => m.ProductsRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./core/users/users.routes').then((m) => m.UserRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('./core/products/product-details/product-details.routes').then(
        (m) => m.ProductDetailsRoutes
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
