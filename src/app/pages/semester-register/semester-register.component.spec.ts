import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterRegisterComponent } from './semester-register.component';

describe('SemesterRegisterComponent', () => {
  let component: SemesterRegisterComponent;
  let fixture: ComponentFixture<SemesterRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
