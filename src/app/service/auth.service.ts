import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl = "http://localhost:8080"

  public username: string = "";
  public password: string = "";


  constructor(private http: HttpClient) {

  }

  authenticate(username: string, password: string) {
    return this.http.get(`http://localhost:8080/login`,
      {headers: {authorization: this.createBasicAuthToken(username, password)}})
      .pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
        console.log("response", res);
      }));

  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    // sessionStorage.setItem('username', username);
    let basicAuthToken = this.createBasicAuthToken(username, password);
    sessionStorage.setItem('username', basicAuthToken);

  }

  getToken() {
    return sessionStorage.getItem('username');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    if (user === null) {
      return false;
    }
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem('username');
    if (user === null) {
      return '';
    }
    return user;
  }

  logout() {
    sessionStorage.removeItem('username');
    this.username = "";
    this.password = "";
  }
}



