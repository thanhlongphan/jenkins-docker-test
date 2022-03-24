import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";//for login auth-form
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpInterceptorService} from "./service/http-interceptor.service";
import { UserListComponent } from './user-list/user-list.component';
import { CurrentUserUpdateComponent } from './current-user-update/current-user-update.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { DeleteUserComponent } from './admin/delete-user/delete-user.component';
import { CreateCustomerComponent } from './bookkeeper/create-customer/create-customer.component';
import { GetAllCustomersComponent } from './bookkeeper/get-all-customers/get-all-customers.component';
import { DeleteCustomerComponent } from './bookkeeper/delete-customer/delete-customer.component';
import { UpdateCustomerComponent } from './bookkeeper/update-customer/update-customer.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UpdateProjectComponent } from './bookkeeper/update-project/update-project.component';
import { ManagementComponent } from './timetabledays/management/management.component';
import { ShowSickEmployeesComponent } from './timetabledays/management/show-sick-employees/show-sick-employees.component';
import { ShowEmployeesOnHolidayComponent } from './timetabledays/management/show-employees-on-holiday/show-employees-on-holiday.component';
import { ShowAllMyHolidaysComponent } from './timetabledays/management/show-all-my-holidays/show-all-my-holidays.component';
import { HeaderComponent } from './header/header.component';
import { AccessDeniedPageComponent } from './access-denied-page/access-denied-page.component';
import { ShowAllMyProjectsComponent } from './projects/show-all-my-projects/show-all-my-projects.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'users', component: UserListComponent},
  { path: 'current-user-update', component: CurrentUserUpdateComponent},
  { path: 'create-new-user', component: CreateUserComponent},
  { path: 'update-user', component: UpdateUserComponent},
  { path: 'delete-user', component: DeleteUserComponent},
  { path: 'customers', component: GetAllCustomersComponent},
  { path: 'create-new-customer', component: CreateCustomerComponent},
  { path: 'delete-customer-by-id', component: DeleteCustomerComponent},
  { path: 'update-project', component: UpdateProjectComponent},
  { path: 'timetable/management', component: ManagementComponent},
  { path: 'timetable/management/all-sick-employees', component: ShowSickEmployeesComponent},
  { path: 'timetable/management/all-employees-on-holiday', component: ShowEmployeesOnHolidayComponent},
  { path: 'timetable/management/show-all-my-holidays', component: ShowAllMyHolidaysComponent},
  { path: 'access-denied', component: AccessDeniedPageComponent},
  { path: 'projects/my-projects', component: ShowAllMyProjectsComponent},
  { path: 'update-customer', component: UpdateCustomerComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,

    UserListComponent,
    CurrentUserUpdateComponent,
    CreateUserComponent,
    UpdateUserComponent,

    DeleteUserComponent,

    CreateCustomerComponent,
    GetAllCustomersComponent,
    DeleteCustomerComponent,
    UpdateProjectComponent,
    UpdateCustomerComponent,
    ManagementComponent,
    ShowSickEmployeesComponent,
    ShowEmployeesOnHolidayComponent,
    ShowAllMyHolidaysComponent,
    HeaderComponent,
    AccessDeniedPageComponent,
    ShowAllMyProjectsComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
