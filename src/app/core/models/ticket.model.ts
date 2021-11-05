export class AddTicket{
    routeId: string;
    seats: Array<number>;
    amount: number;
    seatNumbers: Array<string>;
    constructor(init?:Partial<AddTicket>){
        Object.assign(this, init);
    }
}