import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {User} from "../../users/user";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {
  customerId: number;
  currentUser : User;
  isUserLoggedIn : boolean;

  constructor(private customerService: CustomerService,
              private authService: AuthService,
              private userService: UserService,
              private router : Router) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getCurrentUser().subscribe((res) => {
        this.currentUser = res;
        if(this.currentUser.role == 'EMPLOYEE') {
          this.router.navigate(['/access-denied']);
        }
      }, () => {
        console.log(`Something bad happened! Please check the error.`);
      })
    }
  }

  ngOnInit(): void {
  }

  invalidNumber = false;

  deleteCustomerById() {
    this.customerService.deleteCustomerById(this.customerId).subscribe((data) => {
      alert(`The Customer with Id ${this.customerId} has been deleted.`);
      this.invalidNumber = false;
    }, () => {
      this.invalidNumber = true;
    })
  }
}
