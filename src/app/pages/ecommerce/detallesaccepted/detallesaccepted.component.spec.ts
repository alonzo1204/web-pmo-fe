import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesacceptedComponent } from './detallesaccepted.component';

describe('DetallesacceptedComponent', () => {
  let component: DetallesacceptedComponent;
  let fixture: ComponentFixture<DetallesacceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesacceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesacceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
