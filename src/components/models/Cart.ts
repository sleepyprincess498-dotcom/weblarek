import {IProduct} from '../../types/index';
import { IEvents } from '../base/Events';

export class Cart {
  private items: IProduct[] = [];
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  addItem(product: IProduct): void {
    this.items.push(product);
    this.events.emit('cart:changed');
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit('cart:changed');
  }

  clearCart(): void {
    this.items = [];
    this.events.emit('cart:changed');
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getTotalPrice(): number {
    let totalPrise: number = 0;
    this.items.forEach(item => {
      totalPrise += Number(item.price)
    })

    return totalPrise
  }

  getItemCount(): number {
    return this.items.length
  }

  hasItem(id: string): boolean {
    return !!(this.items.find(item => item.id === id))
  }

  getItemIds(): string[] {
    return this.items.map(item => item.id);
  }

}