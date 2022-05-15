import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsDetailComponent } from './postulations-detail.component';

describe('PostulationsDetailComponent', () => {
  let component: PostulationsDetailComponent;
  let fixture: ComponentFixture<PostulationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
