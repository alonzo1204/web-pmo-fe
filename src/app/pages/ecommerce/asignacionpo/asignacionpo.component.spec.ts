import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionpoComponent } from './asignacionpo.component';

describe('AsignacionpoComponent', () => {
  let component: AsignacionpoComponent;
  let fixture: ComponentFixture<AsignacionpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
