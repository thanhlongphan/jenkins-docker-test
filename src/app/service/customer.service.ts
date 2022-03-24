import { Injectable } from '@angular/core';
import {Customer} from "../customers/customer";
import {AuthService} from "./auth.service";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getAllCustomer() {
    return this.http.get<Customer[]>(`http://localhost:8080/api/customers`);
  }

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(`http://localhost:8080/api/customers`, customer);
  }

  deleteCustomerById(customerId : number) {
    return this.http.delete<void>(`http://localhost:8080/api/customers/${customerId}`);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`http://localhost:8080/api/customers/${id}`);
  }



  findByIdCustomer(customerId: number) {
    return this.http.get<Customer>(`http://localhost:8080/api/customers/${customerId}`);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`http://localhost:8080/api/customers`, customer);
  }
}
