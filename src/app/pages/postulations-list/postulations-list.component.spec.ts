import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsListComponent } from './postulations-list.component';

describe('PostulationsListComponent', () => {
  let component: PostulationsListComponent;
  let fixture: ComponentFixture<PostulationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
