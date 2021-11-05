import { BusService } from './../../../../core/services/bus.service';
import { StationService } from './../../../../core/services/station.service';
import { RouteService } from './../../../../core/services/route.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Station } from 'src/app/core/models/station.interface';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { PaginationResponse } from 'src/app/core/models/pagination-response';
import { Bus } from 'src/app/core/models/busses/bus';
import { AddRoute, Route } from 'src/app/core/models/route.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-route-modal',
  templateUrl: './add-route-modal.component.html',
  styleUrls: ['./add-route-modal.component.scss'],
})
export class AddRouteModalComponent implements OnInit {
  addRouteForm: FormGroup;
  stations: Station[];
  busses: Bus[];
  currentPageStations: number = 0;
  itemsPerPageStations: number = 10;
  currentPageBus: number = 0;
  itemsPerPageBus: number = 10;
  constructor(
    public dialogRef: MatDialogRef<AddRouteModalComponent>,
    private formBuilder: FormBuilder,
    private routeService: RouteService,
    private stationService: StationService,
    private busService: BusService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.stationService
      .getStations(
        new PaginationModel({
          currentPage: this.currentPageStations.toString(),
          itemsPerPage: this.itemsPerPageStations.toString(),
        })
      )
      .subscribe((result: PaginationResponse<Station[]>) => {
        this.stations = result.data;
      });

    this.busService
      .getBusses(
        new PaginationModel({
          currentPage: this.currentPageBus.toString(),
          itemsPerPage: this.itemsPerPageBus.toString(),
        })
      )
      .subscribe((result: any) => {
        this.busses = result.body.data;
        console.log(result)
      });

    this.addRouteForm = this.formBuilder.group({
      price: ['', Validators.required],
      startStation: [0, Validators.required],
      endStation: [0, Validators.required],
      startingDate: [new Date(), Validators.required],
      bus: [0, Validators.required],
      endingDate: [new Date(), Validators.required]
    });
  }

  get f() {
    return this.addRouteForm.value;
  }

  submit(e) {
    e.preventDefault();
    if (this.addRouteForm.valid) {
      console.log(this.f.dates);
      this.routeService.addRoute(
        new AddRoute({
          busId: this.f.bus,
          price: this.f.price,
          startStationId: this.f.startStation,
          endStationId: this.f.endStation,
          endingDate: this.f.endingDate,
          startingDate: this.f.startingDate
        })
      ).subscribe(
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

  onScrollingFinished() {
    console.log('finished');
  }
}
