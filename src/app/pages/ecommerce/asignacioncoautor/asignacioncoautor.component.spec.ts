import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacioncoautorComponent } from './asignacioncoautor.component';

describe('AsignacioncoautorComponent', () => {
  let component: AsignacioncoautorComponent;
  let fixture: ComponentFixture<AsignacioncoautorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacioncoautorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacioncoautorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
