import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentComponent } from './edit-document-component';

describe('EditDocumentComponent', () => {
  let component: EditDocumentComponent;
  let fixture: ComponentFixture<EditDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDocumentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
