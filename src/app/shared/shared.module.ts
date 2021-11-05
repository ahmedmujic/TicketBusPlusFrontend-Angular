import { AuthModule } from './../auth/auth.module';
import { PaginationTableComponent } from './components/pagination-table/pagination-table.component';
import { MainLayoutComponent } from './layout/layouts/main/main-layout.component';
import { BlankLayoutComponent } from './layout/layouts/blank/blank-layout/blank-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './layout/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { HomeComponent } from '../pages/home/home.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MainWithSidebarComponentComponent } from './layout/layouts/MainWithSidebarComponent/MainWithSidebarComponent.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  imports: [
    CdkStepperModule,
    MatStepperModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    AuthModule,
  ],
  declarations: [
    NavComponent,
    HomeComponent,
    SidebarComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    PaginationTableComponent,
    MainWithSidebarComponentComponent
  ],
  exports: [
    NavComponent,
    HomeComponent,
    BlankLayoutComponent,
    MainLayoutComponent,
    MatButtonModule,
    PaginationTableComponent,
  ],
})
export class SharedModule { }
