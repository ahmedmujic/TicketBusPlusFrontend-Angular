import { switchMap } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, Input, OnInit, ChangeDetectorRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PaginationOptions } from 'src/app/core/models/pagination.interface';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent implements OnChanges {
  @Input() data: Observable<any>;
  @Input() columns: Array<string>;
  loaded: boolean = false;

  @Output()
  tableChange: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();

  displayedColumns: string[] = [];
  dataSource;

  length = 20;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnChanges() {
    console.log(this.columns)
    this.data.subscribe((data: any) => {
      this.length = data.body.itemsCount;
      this.displayedColumns = this.columns;
      this.dataSource = new MatTableDataSource<any>(data.body.data)
      this.loaded = true;
    })
  }

  public handlePage(e: any) {
    this.pageSize = e.pageSize;
    this.tableChange.emit({
      pageSize: e.pageSize,
      pageIndex: e.pageIndex

    });
  }

  public trackItem(index: number, item: any) {
    return item.name;
  }

  isDate(val): boolean { return Array.isArray(val) }

  constructor() { }


}
