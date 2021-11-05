import { AuthService } from './../core/services/auth.service';
import { ErrorInterceptor } from './../core/interceptors/error.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    EmailModalComponent,
    ResetPasswordComponent,
  ],

})
export class AuthModule {}
