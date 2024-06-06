import { Injectable } from '@angular/core';
import { Command } from './interfaces/command';
import { ItemService } from './item.service';

@Injectable({
    providedIn: 'root'
})
export class AddItemToListCommand implements Command {
    constructor(private itemService: ItemService) { }

    execute(newItem: string) {
        if (newItem) {
            this.itemService.addItem(newItem);
        }
    }

    canExecute(): boolean {
        return true;
    }
}
