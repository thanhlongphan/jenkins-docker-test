import { Component, OnInit } from '@angular/core';
import {User} from "../../../users/user";
import {Ttd} from "../../ttd";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {TimetableService} from "../../../service/timetable.service";
import {UserService} from "../../../service/user-service.service";

@Component({
  selector: 'app-show-all-my-holidays',
  templateUrl: './show-all-my-holidays.component.html',
  styleUrls: ['./show-all-my-holidays.component.css']
})
export class ShowAllMyHolidaysComponent implements OnInit {

  user : User;
  timeTableDays : Ttd[];
  isEmptyList = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private timeTableService: TimetableService) { }

  ngOnInit(): void {
    this.timeTableService.getAllMyHolidays().subscribe((res) => {
      this.timeTableDays = res;
      if(this.timeTableDays.length > 0) {
        this.isEmptyList = false;
      } else {
        this.isEmptyList = true;
      }
      console.log(res);
    }, () => {
      alert('Something bad happened! Please check and try again');
    });
  }

}
