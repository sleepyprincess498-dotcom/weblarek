import { IProduct } from "../../types";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

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

  setSelectedProduct(id: string): void {
    const product = this.products.find(product => product.id === id);
    if (product) {
      this.selectedProduct = product;
    }
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}