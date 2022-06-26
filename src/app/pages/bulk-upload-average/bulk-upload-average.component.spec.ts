import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadAverageComponent } from './bulk-upload-average.component';

describe('BulkUploadAverageComponent', () => {
  let component: BulkUploadAverageComponent;
  let fixture: ComponentFixture<BulkUploadAverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadAverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
