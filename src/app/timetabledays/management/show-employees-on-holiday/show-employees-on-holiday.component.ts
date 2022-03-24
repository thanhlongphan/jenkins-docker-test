import { Component, OnInit } from '@angular/core';
import {User} from "../../../users/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {TimetableService} from "../../../service/timetable.service";

@Component({
  selector: 'app-show-employees-on-holiday',
  templateUrl: './show-employees-on-holiday.component.html',
  styleUrls: ['./show-employees-on-holiday.component.css']
})
export class ShowEmployeesOnHolidayComponent implements OnInit {

  users : User[];
  date : Date;
  isEmptyList = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private timetableService: TimetableService) { }

  ngOnInit(): void {
  }

  onclick() {
    this.timetableService.getAllEmployeeOnHoliday(this.date).subscribe((res) => {
      this.users = res;
      console.log(res);
      if(this.users.length > 0) {
        this.isEmptyList = false;
      } else {
        this.isEmptyList = true;
      }
    }, () => {
      alert('Something bad happened! Please check and try again.')
    })
  }

}
