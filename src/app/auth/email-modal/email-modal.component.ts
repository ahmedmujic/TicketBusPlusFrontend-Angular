import { AuthService } from './../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.scss'],
})
export class EmailModalComponent implements OnInit {
  emailForm: FormGroup;
  snackbarMsg: string = null;

  constructor(
    public dialogRef: MatDialogRef<EmailModalComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formData() {
    return this.emailForm.value;
  }
  submit(e) {
    e.preventDefault();
    if (!this.emailForm.invalid) {
      this.authService.resetPassword(this.formData.email).subscribe(
        (_) => {
          this.dialogRef.close(true);
        },
        (err) => {
          this._snackBar.open(err.error.errors[0].description, 'Close', {
            duration: 2000,
          });
        }
      );
    } else
      this._snackBar.open('Form is invalid', 'Close', {
        duration: 2000,
      });
  }
}
