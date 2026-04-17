import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentsComponent } from './list-documents-component';

describe('ListDocumentsComponent', () => {
  let component: ListDocumentsComponent;
  let fixture: ComponentFixture<ListDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDocumentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDocumentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
