import { PaginationResponse } from '../pagination-response';

export class Bus {
  id: number;
  name: string;
  numberOfSeats: number;
  constructor(init?: Partial<Bus>) {
    Object.assign(this, init);
  }
}
