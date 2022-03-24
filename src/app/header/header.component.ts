import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {User} from "../users/user";
import {UserService} from "../service/user-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  isUserLoggedIn = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {

    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    // this.userService.getCurrentUser().subscribe((res) => {
    //   this.user = res;
    // } , () => {
    //   console.log(`Something wrong!`);
    // });
  }

  isAdminLoggedIn() {
    return this.user.role === 'ADMIN';
  }

  logout() {
    alert('Logged out');
    this.authService.logout();
  }

}
