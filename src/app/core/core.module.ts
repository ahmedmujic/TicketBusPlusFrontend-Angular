import { BusService } from './services/bus.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RouteService } from './services/route.service';
import { StationService } from './services/station.service';
import { TownService } from './services/town.service';
import { SeatService } from './services/seat.service';
import { InfoService } from './services/info.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    AuthService,
    UserService,
    BusService,
    RouteService,
    StationService,
    TownService,
    SeatService,
    InfoService
  ],
})
export class CoreModule {}
