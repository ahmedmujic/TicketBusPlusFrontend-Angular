import { Upload } from './../../core/models/upload.interface';
import { AddBusModalComponent } from './components/add-bus-modal/add-bus-modal.component';
import { BusService } from './../../core/services/bus.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/core/models/busses/bus';
import { PaginationResponse } from 'src/app/core/models/pagination-response';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { PaginationOptions } from 'src/app/core/models/pagination.interface';

@Component({
  selector: 'app-Busses',
  templateUrl: './Busses.component.html',
  styleUrls: ['./Busses.component.scss'],
})
export class BussesComponent implements OnInit {
  data: any = null;
  currentPage: number = 0;
  itemsPerPage: number = 5;
  uploadForm: FormGroup;
  uploadProgress: Upload | undefined;
  fileName: string;
  columns = ["name", "numberOfSeats"]
  constructor(private busService: BusService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getBusses();
    this.uploadForm = this.fb.group({
      csv: [null]
    })
    this.uploadProgress = {
      progress: 0,
      state: 'PENDING'
    }

  }

  getBusses() {
    console.log(this.itemsPerPage)
    this.data = this.busService.getBusses(
      new PaginationModel({
        currentPage: this.currentPage.toString(),
        itemsPerPage: this.itemsPerPage.toString(),
      })
    )
  }
  openAddBusModal() {
    const dialogRef = this.dialog.open(AddBusModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getBusses();
        this._snackBar.open('Successfully added new vehicle!', 'Close', {
          duration: 3000,
        });

      }
    });
  }

  paginationChange(e: PaginationOptions) {
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.getBusses();
  }

  upload($event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      csv: file
    });
    this.uploadForm.get('csv').updateValueAndValidity()
  }

  submit(e) {
    e.preventDefault();
    console.log("submit")
    var formData: any = new FormData();
    formData.append("file", this.uploadForm.get('csv').value);

    this.busService.uploadAddBusCsv(formData)
      .subscribe((upload) => (this.uploadProgress = upload))
  }

  csvInputChange(e) {
    console.log(e)
    this.fileName = e.target.files[0].name
  }
}