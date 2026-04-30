import "./scss/styles.scss";

// Импорт утилит
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/Events";
import { Api } from "./components/base/Api";
// Импорт моделей
import { ProductCatalog } from "./components/models/ProductCatalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { AppApi } from "./components/models/AppApi";
import { IProduct } from "./types";
import { TPayment } from "./types";
// Импорт представлений
import { Header } from "./components/views/Header";
import { Gallery } from "./components/views/Gallery";
import { Modal } from "./components/views/Modal";
import { CatalogCard } from "./components/views/CatalogCard";
import { PreviewCard } from "./components/views/PreviewCard";
import { BasketCard } from "./components/views/BasketCard";
import { Basket } from "./components/views/Basket";
import { OrderForm } from "./components/views/OrderForm";
import { ContactsForm } from "./components/views/ContactsForm";
import { Success } from "./components/views/Success";


// Шаблоны
const catalogCardTemplate = document.querySelector(
  "#card-catalog",
) as HTMLTemplateElement;
const previewCardTemplate = document.querySelector(
  "#card-preview",
) as HTMLTemplateElement;
const basketCardTemplate = document.querySelector(
  "#card-basket",
) as HTMLTemplateElement;
const basketTemplate = document.querySelector("#basket") as HTMLTemplateElement;
const orderTemplate = document.querySelector("#order") as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
  "#contacts",
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
  "#success",
) as HTMLTemplateElement;
// Контейнеры
const headerElement = document.querySelector(".header") as HTMLElement;
const galleryElement = document.querySelector(".gallery") as HTMLElement;
const modalElement = document.querySelector("#modal-container") as HTMLElement;
// Инициализация EventEmitter
const events = new EventEmitter();
// Инициализация моделей
const api = new AppApi(new Api(API_URL));
const catalog = new ProductCatalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// Инициализация представлений
const header = new Header(headerElement, () => {
  events.emit('basket:open');
});
const gallery = new Gallery(galleryElement);
const modal = new Modal(modalElement, () => {
  events.emit('modal:close');
});
// Создаём PreviewCard один раз
const previewCard = new PreviewCard(previewCardTemplate, () => {
  const product = catalog.getSelectedProduct();
  if (product) {
    events.emit('card:add', product);
  }
});
// Создаём Basket один раз
const basketView = new Basket(basketTemplate, () => {
  events.emit('order:start');
});

// Создаём формы один раз
const orderForm = new OrderForm(orderTemplate, {
  onPaymentChange: (payment: TPayment) => {
    events.emit('order:paymentChanged', { payment });
  },
  onAddressChange: (address: string) => {
    events.emit('order:addressChanged', { address });
  },
  onSubmit: () => {
    events.emit('order:submit');
  }
});
const contactsForm = new ContactsForm(contactsTemplate, {
  onEmailChange: (email: string) => {
    events.emit('contacts:emailChanged', { email });
  },
  onPhoneChange: (phone: string) => {
    events.emit('contacts:phoneChanged', { phone });
  },
  onSubmit: () => {
    events.emit('contacts:submit');
  }
});
const successView = new Success(successTemplate, () => {
  events.emit('success:close');
});



// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
// --- События модели каталога ---
// Каталог изменился — перерисовать галерею
events.on("catalog:changed", (products: IProduct[]) => {
  const cards = products.map((product) => {
    const card = new CatalogCard(catalogCardTemplate, () => {
      events.emit("card:select", product);
    });
    card.title = product.title;
    card.price = product.price;
    card.category = product.category;
    card.image = CDN_URL + product.image;
    return card.render();
  });
  gallery.catalog = cards;
});
// Товар выбран — показать превью
events.on('product:selected', (product: IProduct) => {
  previewCard.title = product.title;
  previewCard.price = product.price;
  previewCard.category = product.category;
  previewCard.image = CDN_URL + product.image;
  previewCard.description = product.description;
  
  // Проверяем, есть ли товар в корзине
  if (cart.hasItem(product.id)) {
    previewCard.buttonText = 'Убрать из корзины';
  } else {
    previewCard.buttonText = 'В корзину';
  }
  
  // Блокируем кнопку если цена null
  previewCard.buttonDisabled = product.price === null;
  
  modal.content = previewCard.render();
  modal.open();
});
// --- События представлений ---
// Клик по карточке в каталоге
events.on("card:select", (product: IProduct) => {
  catalog.setSelectedProduct(product.id);
});
// Добавление/удаление товара в корзину
events.on("card:add", (product: IProduct) => {
  if (cart.hasItem(product.id)) {
    cart.removeItem(product.id);
  } else {
    cart.addItem(product);
  }
  modal.close();
});
// --- События корзины ---
// Корзина изменилась — обновить счётчик
events.on("cart:changed", () => {
  header.counter = cart.getItemCount();
});

// Корзина изменилась — обновить счётчик и содержимое
events.on('cart:changed', () => {
  // Обновляем счётчик в шапке
  header.counter = cart.getItemCount();
  
  // Обновляем содержимое корзины
  const items = cart.getItems().map((product, index) => {
    const card = new BasketCard(basketCardTemplate, () => {
      events.emit('card:remove', product);
    });
    card.title = product.title;
    card.price = product.price;
    card.index = index + 1;
    return card.render();
  });
  
  basketView.items = items;
  basketView.totalPrice = cart.getTotalPrice();
  basketView.valid = cart.getItemCount() > 0;
});


// Открытие корзины
events.on('basket:open', () => {
  modal.content = basketView.render();
  modal.open();
});

// Удаление товара из корзины
events.on('card:remove', (product: IProduct) => {
  cart.removeItem(product.id);
});

// --- События форм ---
// Начало оформления заказа
events.on('order:start', () => {
  modal.content = orderForm.render();
});
// Модель изменилась — обновляем формы через сеттеры
events.on('buyer:changed', () => {
  const buyerData = buyer.getBuyerData();
  
  // Формы отобразят пустые значения из модели
  orderForm.address = buyerData.address;        // ''
  orderForm.payment = buyerData.payment;        // null
  
  contactsForm.email = buyerData.email;         // ''
  contactsForm.phone = buyerData.phone;
});

// Переход к форме контактов
events.on('order:submit', () => {
  modal.content = contactsForm.render();
});

// Изменение способа оплаты
events.on('order:paymentChanged', (data: { payment: TPayment }) => {
  buyer.setPayment(data.payment);
});
// Изменение адреса
events.on('order:addressChanged', (data: { address: string }) => {
  buyer.setAddress(data.address);
});
// Изменение email
events.on('contacts:emailChanged', (data: { email: string }) => {
  buyer.setEmail(data.email);
});
// Изменение телефона
events.on('contacts:phoneChanged', (data: { phone: string }) => {
  buyer.setPhone(data.phone);
});
// Модель покупателя изменилась — обновляем формы
events.on('buyer:changed', () => {
  // Получаем данные из модели
  const buyerData = buyer.getBuyerData();
  
  // Получаем ошибки
  const errors = buyer.validate();

  // Ошибки для формы заказа (payment, address)
  const orderErrors: string[] = [];
  if (errors.payment) orderErrors.push(errors.payment);
  if (errors.address) orderErrors.push(errors.address);

  
  // Ошибки для формы контактов (email, phone)
  const contactsErrors: string[] = [];
  if (errors.email) contactsErrors.push(errors.email);
  if (errors.phone) contactsErrors.push(errors.phone);
  
  // Обновляем форму заказа
  orderForm.address = buyerData.address;
  orderForm.payment = buyerData.payment;
  orderForm.errors = orderErrors.join('; ');
  orderForm.valid = orderErrors.length === 0;
  
  // Обновляем форму контактов
  contactsForm.email = buyerData.email;
  contactsForm.phone = buyerData.phone;
  contactsForm.errors = contactsErrors.join('; ');
  contactsForm.valid = contactsErrors.length === 0;
});



// Отправка заказа
events.on('contacts:submit', () => {
  const orderData = {
    ...buyer.getBuyerData(),
    total: cart.getTotalPrice(),
    items: cart.getItemIds(),
  };
  api.createOrder(orderData)
    .then((result) => {
      successView.total = result.total;
      modal.content = successView.render();
      
      cart.clearCart();
      buyer.clearBuyerData();
    })
    .catch((error) => {
      console.error('Ошибка заказа:', error);
    });
});
// Закрытие модалки
events.on("modal:close", () => {
  modal.close();
});
// ===== ЗАГРУЗКА ДАННЫХ =====
api
  .getProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch((error) => {
    console.error("Ошибка загрузки каталога:", error);
  });