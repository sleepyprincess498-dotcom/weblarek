import { IApi, ApiPostMethods, ProductListSuccess, OrderSuccess, OrderBody } from "../../types";

export class AppApi {
  api: IApi;
   constructor(api: IApi) {
    this.api = api
   }

  getProducts(): Promise<ProductListSuccess> {
    return this.api.get<ProductListSuccess>('/product/');
  }

  createOrder(body: OrderBody): Promise<OrderSuccess> {
    return this.api.post<OrderSuccess>('/order/', body);
  }

}