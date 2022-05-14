import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestDetailComponent } from './change-request-detail.component';

describe('ChangeRequestDetailComponent', () => {
  let component: ChangeRequestDetailComponent;
  let fixture: ComponentFixture<ChangeRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
