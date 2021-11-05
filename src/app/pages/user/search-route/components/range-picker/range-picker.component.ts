import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import {
  PaginationMeta,
  RoutesPaginationModel,
  TownsPaginationModel,
} from 'src/app/core/models/pagination.model';
import { RouteSearch } from 'src/app/core/models/route.model';
import { RouteService } from 'src/app/core/services/route.service';
import { TownService } from 'src/app/core/services/town.service';

@Component({
  selector: 'app-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.scss'],
})
export class RangePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('toTownScroll') selectElem: MatSelect;
  @Output()
  routeSubmit: EventEmitter<RouteSearch> = new EventEmitter<RouteSearch>();
  rangePickForm: FormGroup;
  towns = [];
  routes = [];
  paginationTownMeta: PaginationMeta;
  currentPageTown: number = 0;
  itemsPerPageTown: number = 10;
  offsetTown: number = this.currentPageTown * this.itemsPerPageTown;
  private readonly PIXEL_TOLERANCE = 3.0;

  constructor(
    private townService: TownService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.selectElem.openedChange.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  ngOnInit() {
    this.getTowns();

    this.rangePickForm = this.fb.group({
      startTown: [0, Validators.required],
      endTown: [0, Validators.required],
      startingDate: [new Date(), Validators.required],
      endingDate: [new Date(), Validators.required],
    });
  }
  getTowns() {
    this.townService
      .getTowns(
        new TownsPaginationModel({
          currentPage: this.currentPageTown.toString(),
          itemsPerPage: this.itemsPerPageTown.toString(),
        })
      )
      .subscribe((data) => {
        console.log(data)
        this.towns.push(...data.body);
        this.paginationTownMeta = JSON.parse(data.headers.get('x-pagination'));
      });
  }

  registerPanelScrollEvent() {
    const panel = this.selectElem.panel.nativeElement;
    panel.addEventListener('scroll', (event) => this.loadAllOnScroll(event));
  }

  private hasScrolledToBottom(target): boolean {
    return (
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      this.PIXEL_TOLERANCE
    );
  }

  loadAllOnScroll(event) {
    if (this.hasScrolledToBottom(event.target) && this.paginationTownMeta.HasNext) {
      this.currentPageTown++;
      this.getTowns();
    }
  }

  get f(){
    return this.rangePickForm.value;
  }
  submit(e) {
    e.preventDefault();
    console.log(this.f);
    if (this.rangePickForm.valid) {
      this.routeSubmit.emit({
        endTown: this.f.endTown.toString(),
        startTown: this.f.startTown.toString(),
        startingDate: moment( this.f.startingDate).format('YYYY/MM/DD hh:mm:ss').toString(),
        endingDate: moment( this.f.endingDate).format('YYYY/MM/DD hh:mm:ss').toString()
      });
    } else this._snackBar.open('Form is invalid', 'Close', { duration: 2000 });
  }
}
