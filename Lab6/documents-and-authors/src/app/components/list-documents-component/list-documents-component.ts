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
  filterText: string = 'Showing all documents';
  
  // These variables bind to the input fields via [(ngModel)]
  typeInput: string = '';
  formatInput: string = '';

  constructor(private docService: DocumentService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDocuments('all');
    console.log(this.documents);
  }

  loadDocuments(filter: string, value: string = '') {
    this.docService.getDocuments(filter, value).subscribe(data => {
      this.documents = data;
      console.log(data);
      // Update the UI text based on filter
      if (filter === 'all') this.filterText = 'Showing all documents';
      else this.filterText = `Showing documents where ${filter} = ${value}`;
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
    this.router.navigate(['/edit-document', id]);
  }
}