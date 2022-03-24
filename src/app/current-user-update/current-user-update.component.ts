import { Component, OnInit } from '@angular/core';
import {User} from "../users/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user-service.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-current-user-update',
  templateUrl: './current-user-update.component.html',
  styleUrls: ['./current-user-update.component.css']
})
export class CurrentUserUpdateComponent implements OnInit {

  user: User;
  isUserLoggedIn = false;

  updateFirstName: string;
  updateLastName: string;
  updatePassword: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) {

    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data=> {
      this.user = data;
      console.log(data);
    }, () => {
      console.log('Something wrong!');
    });

    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  onclick() {
    let updateUser = new User();
    updateUser.id = this.user.id;
    updateUser.email = this.user.email;
    updateUser.role = this.user.role;
    updateUser.frozen = this.user.frozen;
    updateUser.firstname = this.updateFirstName || this.user.firstname;
    updateUser.lastname = this.updateLastName || this.user.lastname;
    updateUser.password = this.updatePassword || this.user.password;
    this.userService.updateCurrentUser(updateUser).subscribe((res) => {
      this.router.navigate(['/profile']);
    }, error => console.log(error));
  }



}
