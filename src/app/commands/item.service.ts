import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public items$: Observable<string[]> = this.itemsSubject.asObservable();

  get items(): string[] {
    return this.itemsSubject.getValue();
  }

  addItem(item: string): void {
    const items = this.items;
    items.push(item);
    this.itemsSubject.next(items);
  }

  removeItem(item: string): void {
    const items = this.items.filter(i => i !== item);
    this.itemsSubject.next(items);
  }
}