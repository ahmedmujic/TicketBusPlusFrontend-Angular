import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import { Route } from 'src/app/core/models/route.model';
import { antPath } from 'leaflet-ant-path';
import { Router } from '@angular/router';
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
})
export class RouteComponent implements OnInit, AfterViewInit {
  @Input() route: Route;
  private map;
  constructor(private router: Router) { }


  ngOnInit() { }
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map(this.route.duration.toString(), {}).setView([this.route.startingTownLat, this.route.startingTownLong], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.addControl(new L.Control.Fullscreen().setPosition('topright'));


    var icon_normal = new L.icon({
      iconUrl: 'http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });


    L.marker([this.route.startingTownLat, this.route.startingTownLong], { icon: icon_normal }).addTo(this.map);
    L.marker([this.route.endingTownLat, this.route.endingTownLong], { icon: icon_normal }).addTo(this.map);

    antPath([[this.route.startingTownLat, this.route.startingTownLong], [this.route.endingTownLat, this.route.endingTownLong]], { color: '#FF0000', weight: 5, opacity: 0.6 }).addTo(this.map);
  }
}
