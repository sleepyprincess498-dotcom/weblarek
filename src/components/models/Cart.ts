import {IProduct} from '../../types/index';

export class Cart {
  items: IProduct[] = [];

  getItems(): IProduct[] {
    return this.items;
  }

  addItems(item: IProduct): void {
    this.items.push(item)
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  clearCart(): void {
    this.items = []
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
}