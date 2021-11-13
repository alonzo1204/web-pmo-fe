import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsAsignationComponent } from './project-details-asignation.component';

describe('ProjectDetailsAsignationComponent', () => {
  let component: ProjectDetailsAsignationComponent;
  let fixture: ComponentFixture<ProjectDetailsAsignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsAsignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsAsignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
