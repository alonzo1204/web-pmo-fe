import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsHistoryComponent } from './postulations-history.component';

describe('PostulationsHistoryComponent', () => {
  let component: PostulationsHistoryComponent;
  let fixture: ComponentFixture<PostulationsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
