import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { PaginationMeta, RoutesPaginationModel } from 'src/app/core/models/pagination.model';
import { RouteSearch } from 'src/app/core/models/route.model';
import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-search-route',
  templateUrl: './search-route.component.html',
  styleUrls: ['./search-route.component.scss']
})
export class SearchRouteComponent implements OnInit {

  routes = null;
  currentRoutePage: number = 0;
  itemPerPageRoute: number = 3;
  countItems: number;
  paginationRouteMeta: PaginationMeta;
  offsetRoute: number = this.currentRoutePage * this.itemPerPageRoute;

  loaded: boolean = true;
  endTownId;
  fromTownId;
  startingDate;
  endingDate;
  constructor(private routeService: RouteService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }


  public handlePage(e: any) {
    this.currentRoutePage = e.pageIndex;
    this.loaded = false;
    this.getRoutes();
  }

  getRoutes(){
    this.routeService
        .getRoutes(
          new RoutesPaginationModel({
            currentPage: this.currentRoutePage.toString(),
            itemsPerPage: this.itemPerPageRoute.toString(),
            endTownId: this.endTownId,
            fromTownId: this.fromTownId,
            startingDate: this.startingDate,
            endingDate: this.endingDate
          })
        )
        .subscribe(
          (routes) => {
            this.routes = routes.body.data;
            this.countItems = routes.body.itemsCount;
            this.loaded = true;
          },
          (err) => {
            this._snackBar.open(err.error.errors[0].description, 'Close', {
              duration: 4000,
            });
          }
        );
  }

  searchRoute(event: RouteSearch){
    this.endTownId= event.endTown,
    this.fromTownId= event.startTown,
    this.startingDate= event.startingDate,
    this.endingDate= event.endingDate
    this.loaded = false;
    this.getRoutes();
  }

}
