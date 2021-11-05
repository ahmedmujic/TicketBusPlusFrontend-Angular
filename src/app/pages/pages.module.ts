import { AddRouteModalComponent } from './add-routes/component/add-route-modal/add-route-modal.component';
import { PaginationTableComponent } from './../shared/components/pagination-table/pagination-table.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { BlockStatsComponent } from './dashboard/block-stats/block-stats.component';
import { PieStatsComponent } from './dashboard/pie-stats/pie-stats.component';
import { BussesComponent } from './Busses/Busses.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { AddBusModalComponent } from './Busses/components/add-bus-modal/add-bus-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddRoutesComponent } from './add-routes/add-routes.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { SearchRouteComponent } from './user/search-route/search-route.component';
import { RangePickerComponent } from './user/search-route/components/range-picker/range-picker.component';
import { RouteComponent } from './user/search-route/components/route/route.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { MatRippleModule } from '@angular/material/core';
import { SeatMapComponent } from './user/checkout/seat-map/seat-map.component';
import { PieCountryStatsComponent } from './dashboard/pie-country-stats/pie-country-stats.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMultipleDatesModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatStepperModule,
    MatRippleModule,
    MatProgressSpinnerModule

  ],
  declarations: [
    DashboardComponent,
    BlockStatsComponent,
    PieStatsComponent,
    BussesComponent,
    AddBusModalComponent,
    AddRoutesComponent,
    AddRouteModalComponent,
    SearchRouteComponent,
    RangePickerComponent,
    RouteComponent,
    CheckoutComponent,
    SeatMapComponent,
    PieCountryStatsComponent,

  ],
})
export class PagesModule { }
