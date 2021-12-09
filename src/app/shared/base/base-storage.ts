import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseStorage<T> {
  /**
   * `BehaviorSubject` with all storage objects
   *
   * @return A `BehaviorSubject`, with `T[] extends BaseItem` object.
   */
  itemsSubject = new BehaviorSubject<T[]>(this.items);

  /**
   * `BehaviorSubject` with storage selected object
   *
   * @return A `BehaviorSubject`, with `T extends BaseItem` object.
   */
  itemSubject = new BehaviorSubject<T>(this.item);

  /**
   * A `T[] extends BaseItem` object
   */
  protected _items!: T[];

  /**
   * A `T extends BaseItem` object
   */
  protected _item!: T;

  /**
   * Get all storage objects
   *
   * @return A `T[] extends BaseItem` objects.
   */
  get items(): T[] {
    return this._items;
  }

  /**
   * Set storage objects
   * Emit itemsSubject `BehaviorSubject<T[]>`
   */
  set items(items: T[]) {
    this._items = items;
    this.itemsSubject.next(this._items);
  }

  /**
   * Get element `T extends BaseItem` from storage.
   */
  get item(): T {
    return this._item;
  }

  /**
   * Set element `T extends BaseItem` to storage.
   * Emit itemSubject `BehaviorSubject<T extends BaseItem>`
   *
   * @param item Element `T extends BaseItem`.
   */
  set item(item: T) {
    this._item = item;
    this.itemSubject.next(this._item);
  }

  /**
   * Clear all storage data
   */
  flashAllData(): void {
    this.items = undefined as never;
    this.item = undefined as never;
  }
}
