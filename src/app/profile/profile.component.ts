import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {User} from "../users/user";
import {UserService} from "../service/user-service.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserLoggedIn = false;
  user: User;
  isAdmin = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private userService: UserService) {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      console.log(data);
      this.user = data;
    });
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn();
  }

  isAdminLoggedIn() : boolean {
    return this.user.role == 'ADMIN';
  }


  get userId() {
    return (this.user.id);
  }




}
