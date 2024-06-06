import { Injectable } from '@angular/core';
import { Command } from './interfaces/command';
import { ItemService } from './item.service';

@Injectable({
    providedIn: 'root'
})
export class RemoveItemFromListCommand implements Command {
    constructor(private itemService: ItemService) { }

    execute(itemToRemove: string): void {
        if (itemToRemove) {
            this.itemService.removeItem(itemToRemove);
        }
    }

    canExecute(itemToRemove: string): boolean {
        return this.itemService.items.includes(itemToRemove);
    }
}
