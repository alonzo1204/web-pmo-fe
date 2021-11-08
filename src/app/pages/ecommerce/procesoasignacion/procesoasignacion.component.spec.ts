import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoasignacionComponent } from './procesoasignacion.component';

describe('ProcesoasignacionComponent', () => {
  let component: ProcesoasignacionComponent;
  let fixture: ComponentFixture<ProcesoasignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoasignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
