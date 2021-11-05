import { Token } from './../models/token.interface';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User, UserInfo, UserLogin } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ERROR_CODES } from 'src/app/core/enums/error-codes.enum';
import { MatDialog } from '@angular/material/dialog';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/constants/Role';
import { Roles } from 'src/app/core/constants/Roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.value;
  }
  submit(e) {
    e.preventDefault();
    if (this.loginForm.valid) {
      this.authService
        .login(
          new UserLogin(this.form.email, this.form.username, this.form.password)
        )
        .subscribe(
          (token: Token) => {

            this.authService.getUserInfo().subscribe(
              (user: UserInfo) => {
                this.authService.setUser(new User({
                  token: token.token,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  userName: user.userName,
                  role: user.role
                }));
                user.role === Roles.Company ? this.router.navigateByUrl("/dashboard/home") :
                  this.router.navigateByUrl("/route/search")


              },
              (err) => {
                this._snackBar.open(err.error.errors[0].description, 'Close', {
                  duration: 4000,
                });
              }
            );
          },
          (err) => {
            this._snackBar.open(err.error.errors[0].description, 'Close', {
              duration: 4000,
            });
          }
        );
    } else this._snackBar.open('Form is invalid', 'Close', { duration: 2000 });
  }

  resetPassword(email: string) { }

  openEmailDialog() {
    const dialogRef = this.dialog.open(EmailModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open('Please check your mail address!', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
