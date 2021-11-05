import { BussesComponent } from './Busses/Busses.component';
import { AddRoutesComponent } from './add-routes/add-routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { SearchRouteComponent } from './user/search-route/search-route.component';
import { CheckoutComponent } from './user/checkout/checkout.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'add-routes',
    component: AddRoutesComponent,
  },
  {
    path: 'bus',
    component: BussesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }