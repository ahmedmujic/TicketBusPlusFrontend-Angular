import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Seat } from 'src/app/core/models/seat';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent implements OnInit {
  @Input() seats: Observable<Array<Seat>>;
  @Input() price: number;
  @Output() cartReady: any = new EventEmitter();
  constructor() {}
  seatConfig: any = null;
  seatmap = [];
  seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: true,
    newSeatNoForRow: false,
  };
  cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: '',
    eventId: 0,
    selectedSeatsId:[],
    selectedSeatNumbers:[]
  };
  seatsArray: Array<Seat>;
  seatMap = [];
  title = 'seat-chart-generator';

  ngOnInit(): void {
    var $this = this;
    var blockedSeats = '';
    this.seats.subscribe((data: Array<Seat>) => {
      $this.seatsArray = data;
      var withoutLastSeat = data.length - 6;
      var counter = 1;
      var layoutCounter = 1;
      var layout = '';
      for (var i = 0; i < withoutLastSeat ; i++) {
        if (data[i].checked) {
          var layoutIndex = layoutCounter;
          blockedSeats =
            blockedSeats +
            counter +
            '_' +
            (layoutIndex == 3 || layoutIndex == 4
              ? layoutIndex + 1
              : layoutIndex) +
            ',';
        }
        if (layoutCounter % 3 == 0) {
          layout = layout + '_g';
          console.log(layout);
          layoutCounter++;
          continue;
        }
        layout = layout + 'g';

        if (layoutCounter % 4 == 0) {
          $this.seatMap.push({
            seat_label: counter.toString(),
            layout: 'gg_gg',
          });
          layout = '';
          layoutCounter = 0;
          counter++;
        }

        layoutCounter++;
      }
      if (layout.length > 0)
        $this.seatMap.push({
          seat_label: counter.toString(),
          layout: layout,
        });
      counter++;
      $this.seatMap.push({
        seat_label: counter.toString(),
        layout: 'ggggg',
      });
      console.log(this.seatMap);

      this.seatConfig = [
        {
          seat_price: this.price,
          seat_map: this.seatMap,
        },
      ];
      this.processSeatChart(this.seatConfig);
      this.blockSeats(blockedSeats.slice(0, -1));
    });
  }

  processBooking() {
    for(var i = 0; i < this.cart.selectedSeats.length; i++){
      console.log(this.seatsArray[this.cart.selectedSeats[i]-1].id)
      this.cart.selectedSeatsId.push(this.seatsArray[this.cart.selectedSeats[i]-1].id)
      this.cart.selectedSeatNumbers.push(this.seatsArray[this.cart.selectedSeats[i]-1].seatCode)
    }
    this.cartReady.emit(this.cart);

  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = '';
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price"
        row_label = 'Row ' + item_map[0].seat_label + ' - ';
        if (item_map[item_map.length - 1].seat_label != ' ') {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += ' : Rs. ' + map_data[__counter].seat_price;

        item_map.forEach((map_element) => {
          var mapObj = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label,
          };
          row_label = '';
          var seatValArr = map_element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach((item) => {
            var seatObj = {
              key: map_element.seat_label + '_' + totalItemCounter,
              price: map_data[__counter]['seat_price'],
              status: 'available',
            };

            if (item != '_') {
              seatObj['seatLabel'] =
               seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj['seatNo'] = '0' + seatNoCounter;
              } else {
                seatObj['seatNo'] = '' + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj['seatLabel'] = '';
            }
            totalItemCounter++;
            mapObj['seats'].push(seatObj);
          });
          // console.log(' \n\n\n Seat Objects ', mapObj);
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    console.log('Seat to block: ', seatObject);
    if (seatObject.status == 'available') {
      seatObject.status = 'booked';
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status = 'booked')) {
      seatObject.status = 'available';
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != '') {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + '';
        var seatSplitArr = seat.split('_');
        console.log('Split seat: ', seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log('\n\n\nFount Seat to block: ', seatObj);
              seatObj['status'] = 'unavailable';
              this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1] =
                seatObj;
              console.log('\n\n\nSeat Obj', seatObj);
              console.log(
                this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }
}
