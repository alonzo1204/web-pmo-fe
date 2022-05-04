import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsViewComponent } from './postulations-view.component';

describe('PostulationsViewComponent', () => {
  let component: PostulationsViewComponent;
  let fixture: ComponentFixture<PostulationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
