import "./scss/styles.scss";

const log = console.log;

import { ProductCatalog } from "./components/models/ProductCatalog";
import { Buyer } from "./components/models/Buyer";
import { Cart } from "./components/models/Cart";
import { AppApi } from "./components/models/AppApi";
import { Api } from "./components/base/Api";

import {API_URL} from "./utils/constants"


// === Тест AppApi (запрос к серверу) ===
//=== Получение данных для теста классов и интерфейсов ===
log('=== AppApi ===');

const BaseApi = new Api(API_URL);
const appApi = new AppApi(BaseApi);
const catalog = new ProductCatalog();

appApi.getProducts()
  .then(data => {
    const products = data.items;
    log('Полученные товары с сервера:', products);

    // === Тест ProductCatalog ===
    console.log('=== ProductCatalog ===');

    catalog.setProducts(products);

    log('Все товары:', catalog.getProducts());
    log('Товар по id "c101ab44-ed99-4a54-990d-47aa2bb4e7d9":', catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
    log('Товар по id "999":', catalog.getProductById('999'));

    catalog.setSelectedProduct("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
    log('Выбранный товар:', catalog.getSelectedProduct());


    // === Тест Cart ===
    log('=== Cart ===');

    const cart = new Cart();
    const plusHour = catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390");
    const button = catalog.getProductById("1c521d84-c48d-48fa-8cfb-9d911fa515fd")
    const ball = catalog.getProductById("90973ae5-285c-4b6f-a6d0-65d1d760b102")
    

    if (button) {
      cart.addItems(button);
    }
    if (ball) {
      cart.addItems(ball);
    }

    log('Товары в корзине:', cart.getItems());
    log('Количество:', cart.getItemCount());
    log('Общая сумма:', cart.getTotalPrice());


    if (plusHour) {
      log('Есть товар plusHour?', cart.hasItem(plusHour.id));
    }
    if (button) {
      log('Есть товар button?', cart.hasItem(button.id));
    }

    if (button) {
      cart.removeItem(button.id);
      log('После удаления товара button:', cart.getItems());
    }

    cart.clearCart();
    log('После очистки корзины:', cart.getItems());
  })
  .catch(error => {
    log(error)
  })


// === Тест Buyer ===
log('=== Buyer ===');

const buyer = new Buyer();

log('Валидация пустого покупателя:', buyer.validate());

buyer.setPayment('card');
buyer.setEmail('test@mail.ru');
buyer.setPhone('+79991234567');
buyer.setAddress('Москва, ул. Пушкина, д. 1');

log('Данные покупателя:', buyer.getBuyerData());
log('Валидация заполненного:', buyer.validate());
buyer.clearBuyerData()
log('После очистки:', buyer.getBuyerData());