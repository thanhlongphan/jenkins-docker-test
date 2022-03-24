import { Component, OnInit } from '@angular/core';
import {Project} from "../project";
import {Ttd} from "../../timetabledays/ttd";
import {User} from "../../users/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";
import {AuthService} from "../../service/auth.service";
import {TimetableService} from "../../service/timetable.service";

@Component({
  selector: 'app-show-all-my-projects',
  templateUrl: './show-all-my-projects.component.html',
  styleUrls: ['./show-all-my-projects.component.css']
})
export class ShowAllMyProjectsComponent implements OnInit {

  myProjects : Project[] = [];
  timetableDays : Ttd[];
  currentUser : User;
  isUserLoggedIn : boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private timetableService: TimetableService) {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if(!this.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }
  }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      this.timetableService.getAllTimeTableDayByUserId(this.currentUser.id).subscribe((data) => {
        this.timetableDays = data;
        for (let ttd of this.timetableDays) {
          if(ttd.project != null) {
            if(!this.containsObject(ttd.project, this.myProjects)) {
              this.myProjects.push(ttd.project)
            }
          }
        }
        console.log(this.myProjects)
      }, () => {
        console.log(`Failed to get timetabledays from server!`);
      })
    }, () => {
      console.log(`Cannot get current user from server.`);
    })
  }

  containsObject(obj : Project, projectList : Project[]) : boolean {
    let i;
    for ( let p of projectList) {
      if (JSON.stringify(p) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

}
