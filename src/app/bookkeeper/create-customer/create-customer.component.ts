import { Component} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../customers/customer";
import {Project} from "../../projects/project";

import {DatePipe} from "@angular/common";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user-service.service";
import {User} from "../../users/user";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers: [DatePipe]
})
export class CreateCustomerComponent {

  name: string;
  address: string;
  projects: Project[] = [];
  start: Date;
  end: Date;
  title: string;

  isUserLoggedIn : boolean;
  currentUser : User;

  constructor(private customerService: CustomerService,
              private modalService: NgbModal,
              private authService: AuthService,
              private router : Router,
              private userService: UserService
              ) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getCurrentUser().subscribe((res) => {
        this.currentUser = res;
        if(this.currentUser.role == 'EMPLOYEE') {
          this.router.navigate(['/access-denied']);
        }
      }, () => {
        console.log(`Something bad happened! Please check error.`);
      })
    }
  }



  onclick() {
    let customer = new Customer();
    customer.name = this.name;
    customer.address = this.address;
    customer.projects = this.projects;
    this.customerService.createCustomer(customer).subscribe((data) => {
      console.log(data);
      alert(`New Customer has been created!`)
      this.projects = [];
    }, () => {
      alert(`Something wrong! Please check the inputs.`);
    });
  }




  addProjectToCustomer() {
    let project = new Project();
    project.title = this.title;
    project.start = this.start;
    project.end = this.end;
    console.log(project);
    this.projects.push(project);
  }

  closeResult = '';

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

}
