import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../customers/customer";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {


  customer: Customer;
  toUpdateCustomerId: number;
  invalidCustomerId = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) { }


  ngOnInit(): void {
  }
   
  onclick() {
    this.customerService.updateCustomer(this.customer).subscribe((data) => {
      console.log(data);
      alert('Customer has been updated!');
    }, () => {
      alert('Something wrong! Please check inputs again.')
    })
  }

  findByIdCustomer() {
    this.customerService.findByIdCustomer(this.toUpdateCustomerId).subscribe((data) => {
      console.log(data);
      this.customer = data;
      this.invalidCustomerId = false;
    }, () => {
      this.invalidCustomerId = true;
    })

}
}
