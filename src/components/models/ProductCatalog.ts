import { IProduct } from "../../types";
import { IEvents } from '../base/Events';

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  private events: IEvents;
  constructor(events: IEvents) {
    this.events = events;
  }
  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('catalog:changed', this.products);
  }
  getProducts(): IProduct[] {
    return this.products;
  }
  getProductById(id: string): IProduct | null {
    return this.products.find(product => product.id === id) || null;
  }
  setSelectedProduct(id: string): void {
    this.selectedProduct = this.getProductById(id);
    if (this.selectedProduct) {
      this.events.emit('product:selected', this.selectedProduct);
    }
  }
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
