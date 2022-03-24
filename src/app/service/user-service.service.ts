import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {User} from "../users/user";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserName: string;

  constructor(private http: HttpClient,
           ) {
  }


  getUserByEmail(email: string) {
    return this.http.get<User>(`http://localhost:8080/api/users/user-by-email/${email}`)
      .pipe(catchError(this.handleError));
  }

  getCurrentUser() {
    return this.http.get<User>(`http://localhost:8080/api/users/current-user`).pipe(catchError(this.handleError));
  }


  getAllUsers() {
    return this.http.get<User[]>(`http://localhost:8080/api/users`).pipe(catchError(this.handleError));
  }

  updateCurrentUser(updateUser: User) {
    return this.http.put<User>(`http://localhost:8080/api/users/current-user/update`, updateUser)
      .pipe(catchError(this.handleError));
  }

  createNewUser(user: User) : Observable<User> {
    return this.http.post<User>(`http://localhost:8080/api/users`, user).
    pipe(catchError(this.handleError));
  }

  getUserById(userId: number) {
    return this.http.get<User>(`http://localhost:8080/api/users/${userId}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(toUpdateUser: User, userId: number) {
    return this.http.put<User>(`http://localhost:8080/api/users/update/${userId}`, toUpdateUser)
      .pipe(catchError(this.handleError));
  }


  deleteUser( userId: number) {
    return this.http.delete<User>(`http://localhost:8080/api/users/${userId}`)

  }

  applyForHoliday(id: number, workdayId: number, duration: number): Observable<void> {
    let params = new HttpParams();
    params = params.set('dayId', workdayId);
    params = params.set('duration',duration);
    return this.http.post<void>(`http://localhost:8080/api/users/apply/holiday/${id}`, {body : null },{params: params} )
  }

  private handleError(httpError: HttpErrorResponse) {
    if(httpError.error instanceof ErrorEvent) {
      console.log('An error occurred: ', httpError.error.message);
    } else {
      //the backend returned an unsuccessful response code.
      //the response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }



}


