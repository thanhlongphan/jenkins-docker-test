import { Component, OnInit } from '@angular/core';
import { AuthService} from "../service/auth.service";
import { ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUserLoggedIn = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public loginService: AuthService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
  }

  logout() {
    this.loginService.logout();
  }
}
