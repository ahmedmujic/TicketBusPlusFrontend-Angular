import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from './../models/token.interface';
import { AuthService } from './../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PasswordMatch } from 'src/app/core/validators/password.validator';
import { ChangePassword } from '../models/change-password.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  userId: string;
  token: string;
  resetPasswordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.token = params['token'];
    });

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordMatch('password', 'confirmPassword'),
      }
    );
  }

  get form(){
    return this.resetPasswordForm.value;
  }
  submit(e) {
    e.preventDefault();
    if(this.resetPasswordForm.valid){
      this.authService.changePassword(new ChangePassword({
        id : this.userId,
        token : this.token,
        password : this.form.password
      })).subscribe(_ => {
        this.router.navigateByUrl('auth/login')
        this._snackBar.open("Successfully changed password!", "Close", {duration: 3000});
      },
        err => {
          this._snackBar.open("Somethign went wrong!", "Close", {duration: 3000});
        })
    }
  }
}
