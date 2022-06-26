import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadEnglishComponent } from './bulk-upload-english.component';

describe('BulkUploadEnglishComponent', () => {
  let component: BulkUploadEnglishComponent;
  let fixture: ComponentFixture<BulkUploadEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
