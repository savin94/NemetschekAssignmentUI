import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddItemToListCommand } from '../../commands/add-item-to-list-command.service';
import { RemoveItemFromListCommand } from '../../commands/remove-item-from-list-command.service';
import { ItemService } from '../../commands/item.service';
import { SaveCommand } from '../../commands/save-command.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.scss']
})

export class Tab2Component implements OnInit {
  form2: FormGroup;
  items: string[] = [];
  isFieldDisabled: boolean = false; // Here we can have additional logic on when to disable the field
  private itemsSubscription: Subscription | null = null;

  constructor(
    private addItemCommand: AddItemToListCommand,
    private removeItemCommand: RemoveItemFromListCommand,
    private itemService: ItemService,
    private saveCommand: SaveCommand,
    private fb: FormBuilder) {
    this.form2 = this.fb.group({
      field3: ['']
    });
  }

  ngOnInit(): void {
    this.itemsSubscription = this.itemService.items$.subscribe(items => this.items = items);
    this.form2.valueChanges.subscribe((value) => {
      this.saveCommand.setSaveButtonState(true);
    });

    this.saveCommand.loadingState$.subscribe(isLoading => {
      if (isLoading) {
        this.form2.disable();
      } else {
        this.form2.enable({ emitEvent: false });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  addItem(): void {
    const newItemControl = this.form2.get('field3');
    if (newItemControl && (newItemControl.value != undefined && newItemControl.value.length > 0) && this.items.length < 10) {
      this.addItemCommand.execute(newItemControl.value);
      newItemControl.reset();
      this.saveCommand.setSaveButtonState(true);
    }
  }

  removeItem(item: string): void {
    if (this.removeItemCommand.canExecute(item)) {
      this.removeItemCommand.execute(item);
      this.saveCommand.setSaveButtonState(true);
    }
  }
}
