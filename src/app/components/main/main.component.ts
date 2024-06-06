import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaveCommand } from '../../commands/save-command.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  form1: FormGroup;
  form2: FormGroup;
  canSave = false;
  isLoading = false;

  constructor(private fb: FormBuilder, private saveCommand: SaveCommand) {
    this.form1 = this.fb.group({
      field1: [''],
      field2: ['']
    });

    this.form2 = this.fb.group({
      field3: [''],
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.saveCommand.saveButtonState$.subscribe(state => {
      this.canSave = state;
    });
  }

  save(): void {
    if (this.saveCommand.canExecute()) {
      this.saveCommand.execute({ form1: this.form1.value, form2: this.form2.value });
      this.form1.markAsPristine();
      this.form2.markAsPristine();
      this.saveCommand.setSaveButtonState(false);
    }
  }
}
