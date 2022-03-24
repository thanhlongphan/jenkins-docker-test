import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user-service.service";
import {User} from "../../users/user";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  user: User;
  id: number;
  invalidUserId = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data;
      console.log(data);
      if(this.user.role != 'ADMIN') {
        this.router.navigate(['/access-denied']);
      }
    }, () => {
      this.router.navigate(['/login']);
    });
  }


  ngOnInit(): void {

  }

  onclick() {
    this.userService.deleteUser(this.id).subscribe((data) => {
      console.log(data);
      alert('User deleted');
    }, () => {
      alert('Something wrong! Please check inputs again.')
    })

  }
}
