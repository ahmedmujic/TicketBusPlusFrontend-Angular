import { AuthService } from './../../../core/services/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { User, UserInfo } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';


const UserRoutes = [
  { name: 'Route search', route: '/route/search' },
]

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})


export class NavComponent implements OnInit {

  loggedUser: User;
  routes;
  element;

  constructor(private authService: AuthService,
    private route: Router) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    /* if (window.pageYOffset > this.element.clientHeight && this.route.url == "/") {
       this.element.classList.add('navbar-shrink');
     } else {
       this.element.classList.remove('navbar-shrink');
     }*/
  }

  ngOnInit() {
    /*this.element = document.querySelector('.navbar') as HTMLElement;
    this.element.classList.add('navbar-shrink');*/
    this.authService.getUserInfo().subscribe(
      (user: UserInfo) => {
        var userStore = new User({
          token: user.token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          role: user.role
        });
        this.authService.setUser(userStore);
        this.loggedUser = userStore;
        this.routes = userStore.role === "User" ? UserRoutes : [];
      });

  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/auth/login');
  }

}
