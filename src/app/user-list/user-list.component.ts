import { Component, OnInit } from '@angular/core';
import {User} from "../users/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user-service.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  isUserLoggedIn = false;
  user: User;
  isAdminLoggedIn : boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal,) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.userService.getCurrentUser().subscribe((res) => {
        this.user = res;
        if(this.user.role == 'ADMIN') {
          this.isAdminLoggedIn = true;
        } else {
          this.isAdminLoggedIn = false;
        }
      }, () => {
        console.log(`Something wrong! Please check the error.`);
      })
    }
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
    // this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }


  // isAdminLoggedIn() {
  //   return this.user.role === 'ADMIN';
  // }

  onClickDelete(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log(data);
      alert('User deleted!');
      // this.userService.getAllUsers().subscribe(data => {
      //   console.log(data);
      //   this.users = data;
      // });
      window.location.reload();
    }, () => {
      alert('Something wrong! Please check the error.');
    })
  }



  toUpdateUser : User;


  onClickUpdate() {
    this.userService.updateUser(this.toUpdateUser, this.toUpdateUser.id).subscribe((res) => {
      console.log(res);
      alert('User has been updated!');
      window.location.reload();
    }, () => {
      alert('Something wrong! Please check the inputs again.');
    })
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

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((res) => {
      this.toUpdateUser = res;
    }, () => {
      console.log(`Something wrong! Please check error!`);
    })
  }
}
