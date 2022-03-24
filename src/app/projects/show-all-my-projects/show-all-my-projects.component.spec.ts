import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllMyProjectsComponent } from './show-all-my-projects.component';

describe('ShowAllMyProjectsComponent', () => {
  let component: ShowAllMyProjectsComponent;
  let fixture: ComponentFixture<ShowAllMyProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllMyProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllMyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
