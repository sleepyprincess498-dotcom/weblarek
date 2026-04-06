export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}


export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null,
}

export type TPayment = 'cash' | 'card';

export interface IBuyer {
    payment: TPayment | null,
    address: string,
    email: string,
    phone: string
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface ProductListSuccess {
    total: number,
    items: IProduct[]
}

export interface OrderSuccess {
    id: string,
    total: number
}

export interface OrderBody extends IBuyer{
    total: number; 
    items: string[]; 
} 