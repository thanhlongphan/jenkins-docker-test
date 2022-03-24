import { Component, OnInit } from '@angular/core';
import {User} from "../../users/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user-service.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TimetableService} from "../../service/timetable.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  user: User;
  isUserLoggedIn = false;
  workdayId : number = 0;
  duration: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }
  }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      console.log(data);
    })
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  isAdminLoggedIn() {
    return this.user.role === 'ADMIN';
  }

  //FROM HERE: APPLY FOR HOLIDAY
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

  onClickApplyHoliday() {
    this.userService.applyForHoliday(this.user.id, this.workdayId, this.duration).subscribe( () => {
      alert('Your request has been sent successfully');
    }, () => {
      alert('Failed to send your request');
    })
  }
}
