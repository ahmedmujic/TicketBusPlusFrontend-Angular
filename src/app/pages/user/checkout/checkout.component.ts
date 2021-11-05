import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from 'src/app/core/models/route.model';
import { Seat } from 'src/app/core/models/seat';
import { AddTicket } from 'src/app/core/models/ticket.model';
import { RouteService } from 'src/app/core/services/route.service';
import { SeatService } from 'src/app/core/services/seat.service';
import { TicketService } from 'src/app/core/services/ticket.service';

declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isLinear = true;
  routeId;
  busId;
  seats: Observable<Array<Seat>>;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  price;
  route: Route;
  paidFor = false;
  cart;
  loaded: boolean = false;
  constructor(
    private seatService: SeatService,
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getQueryParams();

    this.seats = this.seatService.getSeats(this.busId);
    this.routeService.getRouteById(this.routeId).subscribe((data: Route) => {
      this.route = data;
      this.loaded = true;
    });
    this.setupPaypal();
  }

  setupPaypal() {
    // paypal
    //   .Buttons({
    //     createOrder: (data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             description: this.route.startingTown + "-" + this.route.endingTown,
    //             amount: {
    //               currency_code: 'USD',
    //               value: this.cart.totalamount
    //             }
    //           }
    //         ]
    //       });
    //     },
    //     onApprove: async (data, actions) => {
    //       const order = await actions.order.capture();
    //       this.paidFor = true;
    //       var seatsIds;
    //       this.seats.subscribe(seats=> {
    //         for(var i = 0; i < this.cart.selectedSeats; i++){
    //           seatsIds.push(seats[i].id)
    //         }
    //       })


    //     },
    //     onError: err => {
    //       console.log(err);
    //     }
    //   })
    //   .render(this.paypalElement.nativeElement);
  }
  getQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.routeId = params['routeId'];
      this.busId = params['busId'];
    });
  }

  cartReady(event) {
    this.cart = event;
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.route.startingTown + "-" + this.route.endingTown,
                amount: {
                  currency_code: 'USD',
                  value: this.cart.totalamount
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {

          this.ticketService
            .bookTicket(
              new AddTicket({
                routeId: this.route.id,
                seats: this.cart.selectedSeatsId,
                seatNumbers: this.cart.selectedSeatNumbers,
                amount: this.cart.totalamount,
              })
            )
            .subscribe(async (_) => {
              const order = await actions.order.capture();
              this.router.navigateByUrl("/route/search");
              this.snackBar.open("Your invoice is sent to email!", 'Close', {
                duration: 2000,
              });
            });


        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);


    console.log(event);
  }
}
