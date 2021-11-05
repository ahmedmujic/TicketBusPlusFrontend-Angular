import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

const CompanyRoutes = [
  { name: 'Dashboard', route: '/dashboard/home', icon: 'dashboard' },
  { name: 'Busses', route: '/dashboard/bus', icon: 'directions_bus' },
  { name: 'Add Routes', route: '/dashboard/add-routes', icon: 'playlist_add' },
]



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  routes;
  opened: boolean = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User) => {
      console.log(user)
      this.routes = user.role === "Company" ? CompanyRoutes : CompanyRoutes;
    });
  }

}
