import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserUpdateComponent } from './current-user-update.component';

describe('CurrentUserUpdateComponent', () => {
  let component: CurrentUserUpdateComponent;
  let fixture: ComponentFixture<CurrentUserUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentUserUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
