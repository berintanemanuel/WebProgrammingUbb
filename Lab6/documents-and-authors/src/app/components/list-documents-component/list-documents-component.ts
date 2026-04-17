import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
import { DocumentService } from '../../services/document.service';
import { Document } from '../add-document-component/add-document-component';

@Component({
  selector: 'app-list-documents',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-documents-component.html'
})
export class ListDocumentsComponent implements OnInit {
  documents: Document[] = [];
  
  get filterText() { return this.docService.currentFilter.text; }

  // These variables bind to the input fields via [(ngModel)]
  typeInput: string = '';
  formatInput: string = '';

  constructor(private docService: DocumentService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Restore the inputs from the service (optional, so the boxes stay filled)
    if (this.docService.currentFilter.by === 'type') this.typeInput = this.docService.currentFilter.value;
    if (this.docService.currentFilter.by === 'format') this.formatInput = this.docService.currentFilter.value;

    // Load using the saved state
    this.loadDocuments(this.docService.currentFilter.by, this.docService.currentFilter.value);
  }

  loadDocuments(filter: string, value: string = '') {
    this.docService.getDocuments(filter, value).subscribe(data => {
      this.documents = data;
      
      this.docService.currentFilter.by = filter;
      this.docService.currentFilter.value = value;
      // Update the UI text based on filter

      if (filter === 'all') {
        this.docService.currentFilter.text = 'Showing all documents';
      } else {
        this.docService.currentFilter.text = `Showing documents where ${filter} = ${value}`;
      }

      localStorage.setItem('docFilter', JSON.stringify(this.docService.currentFilter));

      this.cdr.detectChanges();
    });
  }

  onDelete(id: number) {
    if (confirm("Are you sure?")) {
      this.docService.deleteDocument(id).subscribe(() => {
        // Refresh the current view
        this.loadDocuments('all'); 
      });
    }
  }

  onEdit(id: number) {
    this.router.navigate(['/edit-document-component', id]);
  }
}