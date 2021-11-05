export class PaginationResponse<T> {
  pageOffset: number;
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
  data: T;
}
