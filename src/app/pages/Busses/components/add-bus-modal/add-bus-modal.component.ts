import { BusService } from './../../../../core/services/bus.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bus } from 'src/app/core/models/busses/bus';

@Component({
  selector: 'app-add-bus-modal',
  templateUrl: './add-bus-modal.component.html',
  styleUrls: ['./add-bus-modal.component.scss'],
})
export class AddBusModalComponent implements OnInit {
  addBusForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddBusModalComponent>,
    private formBuilder: FormBuilder,
    private busService: BusService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.addBusForm = this.formBuilder.group({
      name: ['', Validators.required],
      numberOfSeats: [0, Validators.required],
    });
  }

  get formData() {
    return this.addBusForm.value;
  }

  submit(e) {
    e.preventDefault();
    if (this.addBusForm.valid) {
      this.busService
        .addBus(
          new Bus({
            name: this.formData.name,
            numberOfSeats: this.formData.numberOfSeats,
          })
        )
        .subscribe(
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
