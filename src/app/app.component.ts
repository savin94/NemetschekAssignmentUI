import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DocumentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NemetschekAssignment';
}