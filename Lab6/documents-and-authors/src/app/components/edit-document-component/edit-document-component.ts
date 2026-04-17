import { Component } from '@angular/core';
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
    nopages: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    format: new FormControl('', [Validators.required])
  })

  documentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router
  ){}

  ngOnInit(){
    const idParam = this.route.snapshot.params['documentId'];
    this.documentId = idParam ? parseInt(idParam, 10) : null;
  }

  onSubmit(){
    if(this.documentForm.valid && this.documentId){
      const payload = {
        ...this.documentForm.value,
        document_id: this.documentId
      };
      this.documentService.editDocument(this.documentId, this.documentForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => console.error(err)
      });
    }
  }
}
