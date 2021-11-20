import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsPortfolioComponent } from './project-details-portfolio.component';

describe('ProjectDetailsPortfolioComponent', () => {
  let component: ProjectDetailsPortfolioComponent;
  let fixture: ComponentFixture<ProjectDetailsPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailsPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
