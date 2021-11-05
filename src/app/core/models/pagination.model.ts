import { HttpParams } from "@angular/common/http";

export class PaginationModel {
    currentPage: string;
    itemsPerPage: string;
    itemsCount: string;
    constructor(init?: Partial<PaginationModel>) {
        Object.assign(this, init);
    }
}

export class RoutesPaginationModel extends PaginationModel {
    startingDate?: string = null;
    endingDate?: string = null;
    fromTownId?: string = null;
    endTownId?: string = null;
    constructor(init?: Partial<RoutesPaginationModel>) {
        super();
        Object.assign(this, init);
    }
}

export class TownsPaginationModel extends PaginationModel {
    constructor(init?: Partial<TownsPaginationModel>) {
        super();
        Object.assign(this, init);
    }
}

export interface PaginationMeta {
    TotalItems: number,
    HasNext: boolean,
    Limit: number,
    Offset: number
}