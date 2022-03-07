import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocumentComponent } from './form-document.component';

describe('FormDocumentComponent', () => {
  let component: FormDocumentComponent;
  let fixture: ComponentFixture<FormDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
