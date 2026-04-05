import { IProduct } from "../../types";

export class ProductCatalog {
  products: IProduct[] = [];
  selectedProduct: IProduct | null = null;

  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | null {
    const found = this.products.find(product => product.id === id);
    return found || null;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}