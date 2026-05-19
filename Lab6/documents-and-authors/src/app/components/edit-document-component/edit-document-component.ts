import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-edit-document-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-document-component.html',
  styleUrl: './edit-document-component.css',
  standalone: true,
})

export class EditDocumentComponent {
  documentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    number_of_pages: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    format: new FormControl('', [Validators.required])
  })

  documentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    const idParam = this.route.snapshot.params['documentId'];
    this.documentId = idParam ? parseInt(idParam, 10) : null;
    this.loadInitialValues(this.documentId);
  }

  loadInitialValues(documentId: number|null){
    /// just to fix the annoying null type error
    if(documentId == null)
      documentId=1;
    this.documentService.getDocumentById(documentId).subscribe({
      next: (response) => {
        this.documentForm.patchValue({
          title: response.title,
          number_of_pages: response.number_of_pages,
          type: response.type,
          format: response.format
        });
      },
      error: (err) => console.error(err)
    });
    this.cdr.detectChanges();
  }

  onSubmit(){
    if(this.documentForm.valid && this.documentId){
      const payload = {
        ...this.documentForm.value,
        document_id: this.documentId
      };
      this.documentService.editDocument(this.documentId, this.documentForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/list-documents-component']);
          },
          error: (err) => console.error(err)
      });
    }
  }
}
