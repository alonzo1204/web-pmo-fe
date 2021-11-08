import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostexitosaComponent } from './postexitosa.component';

describe('PostexitosaComponent', () => {
  let component: PostexitosaComponent;
  let fixture: ComponentFixture<PostexitosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostexitosaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostexitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
