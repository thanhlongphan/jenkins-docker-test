import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSickEmployeesComponent } from './show-sick-employees.component';

describe('ShowSickEmployeesComponent', () => {
  let component: ShowSickEmployeesComponent;
  let fixture: ComponentFixture<ShowSickEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSickEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSickEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
