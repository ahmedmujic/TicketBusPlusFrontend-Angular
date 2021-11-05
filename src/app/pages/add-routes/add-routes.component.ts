import { RouteService } from './../../core/services/route.service';
import { AddRouteModalComponent } from './component/add-route-modal/add-route-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationOptions } from 'src/app/core/models/pagination.interface';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/core/models/pagination-response';
import { Route, RouteTable } from 'src/app/core/models/route.model';
import { PaginationModel } from 'src/app/core/models/pagination.model';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.scss']
})
export class AddRoutesComponent implements OnInit {

  currentPage: number = 0;
  itemsPerPage: number = 5;
  data: any = null;
  columns = ["busName", "startingTown", "endingTown", "price", "sells"]

  constructor(public dialog: MatDialog,
    private routeService: RouteService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.getRoutes()
  }

  getRoutes() {
    this.data = this.routeService.getRoutes(
      new PaginationModel({
        currentPage: this.currentPage.toString(),
        itemsPerPage: this.itemsPerPage.toString(),
      })
    )
  }

  openAddRouteModal() {
    const dialogRef = this.dialog.open(AddRouteModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.getRoutes();
      this._snackBar.open('Successfully added new route!', 'Close', {
        duration: 3000,
      });

    }
    );
  }

  paginationChange(e: PaginationOptions) {
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.getRoutes();
  }

}
