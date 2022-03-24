import { Component, OnInit } from '@angular/core';
import {User} from "../../users/user";
import {UserService} from "../../service/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role = "EMPLOYEE";

  roles = ['EMPLOYEE', 'BOOKKEEPER', 'ADMIN'];

  currentUser : User;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      if(this.currentUser.role != 'ADMIN') {
        this.router.navigate(['/access-denied']);
      }
    }, () => {
      this.router.navigate(['/login']);
    })
  }

  ngOnInit(): void {
  }

  onclick() {
    let user = new User();
    user.firstname = this.firstName;
    user.lastname = this.lastName;
    user.email = this.email;
    user.password = this.password;
    user.role = this.role;
    user.frozen = true;
    user.urlaubstage = 30;
    this.userService.createNewUser(user).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/home']);
    }, error => console.log(error));
  }

  roleSelect(value: any) {
    this.role = value;
  }
}
