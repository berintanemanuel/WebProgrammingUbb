import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentComponent } from './add-document-component';

describe('AddDocumentComponent', () => {
  let component: AddDocumentComponent;
  let fixture: ComponentFixture<AddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDocumentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
