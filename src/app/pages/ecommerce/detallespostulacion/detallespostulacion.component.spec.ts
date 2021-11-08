import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallespostulacionComponent } from './detallespostulacion.component';

describe('DetallespostulacionComponent', () => {
  let component: DetallespostulacionComponent;
  let fixture: ComponentFixture<DetallespostulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallespostulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallespostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
