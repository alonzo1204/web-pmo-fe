import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsReviewComponent } from './project-details-review.component';

describe('ProjectDetailsReviewComponent', () => {
  let component: ProjectDetailsReviewComponent;
  let fixture: ComponentFixture<ProjectDetailsReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
