import "./scss/styles.scss";

const log = console.log;

import { ProductCatalog } from "./components/models/ProductCatalog";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { IBuyer, IProduct, TBuyerErrors, TPayment } from "./types";
import { IApi, ApiPostMethods, ProductListSuccess, OrderSuccess, OrderBody } from "./types";
import { AppApi } from "./components/models/Api";
import { Api } from "./components/base/Api";



// === Тестовые данные ===
const testProduct1: IProduct = {
  id: '1',
  title: 'Кружка',
  description: 'Красивая кружка',
  image: '/images/mug.png',
  category: 'другое',
  price: 500
};

const testProduct2: IProduct = {
  id: '2',
  title: 'Футболка',
  description: 'Крутая футболка',
  image: '/images/tshirt.png',
  category: 'софт-скил',
  price: 1200
};

const testProduct3: IProduct = {
  id: '3',
  title: 'Бесценный товар',
  description: 'Его нельзя купить',
  image: '/images/priceless.png',
  category: 'другое',
  price: null
};


// === Тест ProductCatalog ===
console.log('=== ProductCatalog ===');

const catalog = new ProductCatalog();

catalog.setProducts([testProduct1, testProduct2, testProduct3]);

log('Все товары:', catalog.getProducts());
log('Товар по id "2":', catalog.getProductById('2'));
log('Товар по id "999":', catalog.getProductById('999'));

catalog.setSelectedProduct(testProduct1);
log('Выбранный товар:', catalog.getSelectedProduct());



// === Тест Cart ===
log('=== Cart ===');

const cart = new Cart();

cart.addItems(testProduct1);
cart.addItems(testProduct2);

log('Товары в корзине:', cart.getItems());
log('Количество:', cart.getItemCount());
log('Общая сумма:', cart.getTotalPrice());
log('Есть товар "1"?', cart.hasItem('1'));
log('Есть товар "999"?', cart.hasItem('999'));

cart.removeItem('1');
log('После удаления товара "1":', cart.getItems());

cart.clearCart();
log('После очистки корзины:', cart.getItems());


// === Тест Buyer ===
log('=== Buyer ===');

const buyer = new Buyer();

log('Валидация пустого покупателя:', buyer.validate());
log('Валиден?', buyer.isValid());

buyer.setPayment('card');
buyer.setEmail('test@mail.ru');
buyer.setPhone('+79991234567');
buyer.setAddress('Москва, ул. Пушкина, д. 1');

log('Данные покупателя:', buyer.getBuyerData());
log('Валидация заполненного:', buyer.validate());
log('Валиден?', buyer.isValid());
log('После очистки:', buyer.clearBuyerData());


// === Тест AppApi (запрос к серверу) ===
log('=== AppApi ===');

const BaseApi = new Api('https://larek-api.nomoreparties.co/api/weblarek');
const appApi = new AppApi(BaseApi);
const catalog2 = new ProductCatalog();

appApi.getProducts()
  .then(data => {
    catalog2.products = data.items
    log(catalog2.products)
  })