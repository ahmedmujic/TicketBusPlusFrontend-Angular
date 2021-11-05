export class Route{
    id: string;
    startStationId: number;
    startingTown: string;
    endingTown: string;
    endStationId: number;
    startingTownLat: string;
    startingTownLong: string;
    endingTownLong: string;
    endingTownLat: string;
    busId: number;
    price: number;
    duration: number;
    sells: number;
    startingDate: Date;
    endingDate: Date;
    constructor(init?:Partial<Route>){
        Object.assign(this, init);
    }
}

export class AddRoute{
    startStationId: number;
    endStationId: number;
    busId: number;
    price: number;
    startingDate: Date;
    endingDate: Date;
    constructor(init?:Partial<AddRoute>){
        Object.assign(this, init);
    }
}

export interface RouteTable{
    startStation: string;
    endStation: string;
    bus: string;
    price: number;
    sellings: number;
    dates: Array<Date>;
}

export interface RouteSearch{
    startTown: string;
    endTown: string;
    startingDate: string;
    endingDate: string;
}