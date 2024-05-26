import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DocumentService } from '../../services/document/document.service';
import { Document } from '../../models/document.model';
import { CreateDocument } from '../../models/create-document.model';
import { NemetschekDocumentType } from '../../models/NemetschekDocumentType';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  isModalOpen = false;
  newDocument: CreateDocument = { name: '', description: '', type: NemetschekDocumentType.PDF };
  types = NemetschekDocumentType;
                          
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    this.documentService.getDocuments().subscribe(docs => this.documents = docs);
  }

  openAddModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addDocument(): void {
    console.log(this.newDocument)
    this.documentService.createDocument(this.newDocument).subscribe(doc => {
      this.documents.push(doc);
      this.closeModal();
    });
  }

  editDocument(document: Document): void {
    // Handle the edit logic
  }

  deleteDocument(id: string): void {
    this.documentService.deleteDocument(id).subscribe(() => this.fetchDocuments());
  }
}
