import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DocumentService } from '../../services/document.service';

export interface Document {
  id: number;
  title: string;
  number_of_pages: number,
  type: string,
  format: string,
  author_id: number
}

@Component({
  selector: 'app-add-document-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-document-component.html',
  styleUrl: './add-document-component.css',
  standalone: true,
})

export class AddDocumentComponent {
  documentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    number_of_pages: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    format: new FormControl('', [Validators.required])
  })

  authorId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router
  ){}

  ngOnInit() {
    // Get the parameter named 'authorId' from the URL
    const idParam = this.route.snapshot.params['authorId'];
    this.authorId = idParam ? parseInt(idParam, 10) : null;
  }

  onSubmit(){
    if(this.documentForm.valid && this.authorId){
      const payload = {
        ...this.documentForm.value,
        author_id: this.authorId
      };
      this.documentService.addDocument(payload).subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (err) => console.error(err)
      });
    }
  }

}
