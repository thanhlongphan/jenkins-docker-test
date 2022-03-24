import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../users/user";
import {Ttd} from "../timetabledays/ttd";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {


  constructor(private http : HttpClient) { }

  getAllSickEmployeeOnThatDay(date: Date) {
    let params = new HttpParams();
    let dateString : string;
    if(date) {
      dateString = new Date(date).toISOString();
      params = params.set('date', dateString);
    }

    return this.http.get<User[]>(`http://localhost:8080/api/timeTableDays/sickEmployees`, {params: params});
  }

  getAllEmployeeOnHoliday(date: Date) {
    let params = new HttpParams();
    let dateString : string;
    if(date) {
      dateString = new Date(date).toISOString();
      params = params.set('date', dateString);
    }
    return this.http.get<User[]>(`http://localhost:8080/api/timeTableDays/employeesOnHoliday`, {params: params});
  }

  getAllMyHolidays() {
    return  this.http.get<Ttd[]>(`http://localhost:8080/api/users/holidays`);
  }

  getAllTimeTableDayByUserId(id: number) {
    return this.http.get<Ttd[]>(`http://localhost:8080/api/timeTableDays/users/${id}`);
  }
}
