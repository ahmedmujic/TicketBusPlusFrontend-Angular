import { MainWithSidebarComponentComponent } from './shared/layout/layouts/MainWithSidebarComponent/MainWithSidebarComponent.component';
import { SharedModule } from './shared/shared.module';
import { BlankLayoutComponent } from './shared/layout/layouts/blank/blank-layout/blank-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/layouts/main/main-layout.component';
import { SearchRouteComponent } from './pages/user/search-route/search-route.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: MainWithSidebarComponentComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: 'route',
    component: MainLayoutComponent,
    children: [
      {
        path: 'search',
        component: SearchRouteComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
