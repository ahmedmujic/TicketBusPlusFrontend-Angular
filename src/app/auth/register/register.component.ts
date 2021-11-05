import { EmailModalComponent } from './../email-modal/email-modal.component';
import { Company } from './../models/company-register.model';

import { AuthService } from './../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordMatch } from 'src/app/core/validators/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserRegister } from '../models/user-register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        gender: [0, Validators.required],
        userType: ['user'],
      },
      {
        validator: PasswordMatch('password', 'confirmPassword'),
      }
    );
  }

  get form() {
    return this.registrationForm.value;
  }

  submit() {
    this.authService
      .registerUser(
        this.form.userType === 'company' ?
          new Company(
            this.form.email,
            this.form.firstName,
            this.form.lastName,
            this.form.password,
            this.form.username
          ) :
          new UserRegister({
            email: this.form.email,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            password: this.form.confirmPassword,
            userName: this.form.username
          })
      )
      .subscribe(
        (_) => {
          this._snackBar.open("Please check your email!", 'Close', {
            duration: 2000,
          });
        },
        (err) => {
          this._snackBar.open(err.error.errors[0].description, 'Close', {
            duration: 2000,
          });
        }
      );
  }

}
