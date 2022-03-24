import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeesOnHolidayComponent } from './show-employees-on-holiday.component';

describe('ShowEmployeesOnHolidayComponent', () => {
  let component: ShowEmployeesOnHolidayComponent;
  let fixture: ComponentFixture<ShowEmployeesOnHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEmployeesOnHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeesOnHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
