import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";

import {User} from "../../users/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  currentUser : User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) {
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      if(this.currentUser.role != 'ADMIN') {
        this.router.navigate(['/access-denied']);
      }
    }, () => {
      this.router.navigate(['/login']);
    })
  }

  toUpdateUser: User;
  toUpdateUserId: number;
  invalidUserId = false;

  ngOnInit(): void {

  }

  onclick() {
    //console.log(this.toUpdateUser);
    this.userService.updateUser(this.toUpdateUser, this.toUpdateUserId).subscribe((data) => {
      console.log(data);
      alert('User has been updated!');
    }, () => {
      alert('Something wrong! Please check inputs again.')
    })
  }

  getUserById() {
    // console.log(`${this.userIdToUpdate}`);
    this.userService.getUserById(this.toUpdateUserId).subscribe((data) => {
      console.log(data);
      this.toUpdateUser = data;
      this.invalidUserId = false;
    }, () => {
      this.invalidUserId = true;
    })
  }

  // get userIdToUpdate() {
  //   return this.toUpdateUserId;
  // }
}
