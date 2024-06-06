import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaveCommand } from '../../commands/save-command.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {
  form1: FormGroup;

  constructor(private fb: FormBuilder, private saveCommand: SaveCommand,) {
    this.form1 = this.fb.group({
      field1: [''],
      field2: ['']
    });
  }

  ngOnInit(): void {
    this.form1.valueChanges.subscribe(() => {
      this.saveCommand.setSaveButtonState(true);
    });

    this.saveCommand.loadingState$.subscribe(isLoading => {
      if (isLoading) {
        this.form1.disable();
      } else {
        this.form1.enable({ emitEvent: false });
      }
    });
  }
}
