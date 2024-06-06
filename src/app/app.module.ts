import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { Tab1Component } from './components/tab1/tab1.component';
import { Tab2Component } from './components/tab2/tab2.component';
import { SaveCommand } from './commands/save-command.service';
import { AddItemToListCommand } from './commands/add-item-to-list-command.service';
import { RemoveItemFromListCommand } from './commands/remove-item-from-list-command.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Tab1Component,
    Tab2Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule
  ],
  providers: [
    SaveCommand,
    { provide: 'items', useValue: [] }, // Provide the items array
    AddItemToListCommand,
    RemoveItemFromListCommand
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
