import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllMyHolidaysComponent } from './show-all-my-holidays.component';

describe('ShowAllMyHolidaysComponent', () => {
  let component: ShowAllMyHolidaysComponent;
  let fixture: ComponentFixture<ShowAllMyHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllMyHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllMyHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
