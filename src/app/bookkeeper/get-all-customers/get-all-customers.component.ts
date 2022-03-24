import {Component, OnInit} from '@angular/core';
import {Customer} from "../../customers/customer";
import {AuthService} from "../../service/auth.service";
import {CustomerService} from "../../service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../users/user";
import {UserService} from "../../service/user-service.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent implements OnInit {

  customers: Customer[];
  isUserLoggedIn: boolean;
  user: User;
  isAdminLoggedIn = false;

  constructor(private authService: AuthService,
              private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private modalService: NgbModal) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getCurrentUser().subscribe((res) => {
        this.user = res;
        if(this.user.role != 'EMPLOYEE') {
          this.isAdminLoggedIn = true;
        }
      }, () => {
        console.log(`Cannot get current user`)
      })
    }
  }

  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe((data) => {
      this.customers = data;
      console.log(data);
    })
  }

  onClickDelete(id: number) {
    this.customerService.deleteCustomerById(id).subscribe((data) => {
      alert(`The Customer with Id ${id} has been deleted.`);
      window.location.reload();
    }, () => {

    })
  }


  //FROM HERE Update Customer

  closeResult = '';
  toUpdateCustomer : Customer;

  open(content:any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
      this.closeResult = `Closed with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id).subscribe((res) => {
      this.toUpdateCustomer = res;
      console.log(res);
    })
  }

  onClickUpdate() {
    this.customerService.updateCustomer(this.toUpdateCustomer).subscribe((res) => {
      console.log(res);
      alert('Customer has been updated!');
      window.location.reload();
    }, () => {
      alert('Something wrong! Please check the inputs again.');
    })
  }
}
