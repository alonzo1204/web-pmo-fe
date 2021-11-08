import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionpmComponent } from './asignacionpm.component';

describe('AsignacionpmComponent', () => {
  let component: AsignacionpmComponent;
  let fixture: ComponentFixture<AsignacionpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
