import {Component, OnInit} from '@angular/core';
import {Project} from "../../projects/project";
import {AuthService} from "../../service/auth.service";
import {ProjectService} from "../../service/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";
import {User} from "../../users/user";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {

  toUpdateProject: Project;
  toUpdateProjectId: number;
  invalidProjectId = false;

  isUserLoggedIn : boolean;
  currentUser : User;
  constructor(private projectService: ProjectService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {
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
        console.log(`Something wrong! Please check the error.`);
      })
    }
  }

  ngOnInit(): void {

  }

  getProjectById() {
    this.projectService.getProjectById(this.toUpdateProjectId).subscribe((data) => {
      this.toUpdateProject = data;
      console.log(data);
      this.invalidProjectId = false;
    }, () => {
      this.invalidProjectId = true;
    })
  }



  onclick() {
    this.projectService.updateProject(this.toUpdateProject, this.toUpdateProjectId).subscribe((data) => {
      console.log(data);
      alert('Project has been updated!')
    }, () => {
      alert('Something bad happened! Please check the inputs again.');
    })
  }
}
