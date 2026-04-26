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
  events.emit("basket:open");
});
const gallery = new Gallery(galleryElement);
const modal = new Modal(modalElement, () => {
  events.emit("modal:close");
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
events.on("product:selected", (product: IProduct) => {
  const card = new PreviewCard(previewCardTemplate, () => {
    events.emit("card:add", product);
  });
  card.title = product.title;
  card.price = product.price;
  card.category = product.category;
  card.image = CDN_URL + product.image;
  card.description = product.description;

  // Проверяем, есть ли товар в корзине
  if (cart.hasItem(product.id)) {
    card.buttonText = "Убрать из корзины";
  } else {
    card.buttonText = "В корзину";
  }

  // Блокируем кнопку если цена null
  card.buttonDisabled = product.price === null;

  modal.content = card.render();
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
// Открытие корзины
events.on("basket:open", () => {
  const basketView = new Basket(basketTemplate, () => {
    events.emit("order:start");
  });

  const items = cart.getItems().map((product, index) => {
    const card = new BasketCard(basketCardTemplate, () => {
      events.emit("card:remove", product);
    });
    card.title = product.title;
    card.price = product.price;
    card.index = index + 1;
    return card.render();
  });

  basketView.items = items;
  basketView.totalPrice = cart.getTotalPrice();
  basketView.valid = cart.getItemCount() > 0;

  modal.content = basketView.render();
  modal.open();
});
// Удаление товара из корзины
events.on("card:remove", (product: IProduct) => {
  cart.removeItem(product.id);
  events.emit("basket:open"); // Перерисовать корзину
});
// --- События форм ---
// Начало оформления заказа
events.on("order:start", () => {
  const form = new OrderForm(
    orderTemplate,
    () => events.emit("order:submit"),
    (payment) => {
      buyer.setPayment(payment);
      events.emit("order:validate");
    },
    (address) => {
      buyer.setAddress(address);
      events.emit("order:validate");
    },
  );

  modal.content = form.render();
  modal.open();
});
// Валидация формы заказа
events.on("order:validate", () => {
  const errors = buyer.validate();
  const formElement = modalElement.querySelector('form[name="order"]');
  if (formElement) {
    const submitButton = formElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    const errorsElement = formElement.querySelector(
      ".form__errors",
    ) as HTMLSpanElement;

    const errorMessages = [errors.payment, errors.address]
      .filter(Boolean)
      .join("; ");
    errorsElement.textContent = errorMessages;
    submitButton.disabled = !!errors.payment || !!errors.address;
  }
});
// Переход к форме контактов
events.on("order:submit", () => {
  const form = new ContactsForm(
    contactsTemplate,
    () => events.emit("contacts:submit"),
    (email) => {
      buyer.setEmail(email);
      events.emit("contacts:validate");
    },
    (phone) => {
      buyer.setPhone(phone);
      events.emit("contacts:validate");
    },
  );

  modal.content = form.render();
});
// Валидация формы контактов
events.on("contacts:validate", () => {
  const errors = buyer.validate();
  const formElement = modalElement.querySelector('form[name="contacts"]');
  if (formElement) {
    const submitButton = formElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    const errorsElement = formElement.querySelector(
      ".form__errors",
    ) as HTMLSpanElement;

    const errorMessages = [errors.email, errors.phone]
      .filter(Boolean)
      .join("; ");
    errorsElement.textContent = errorMessages;
    submitButton.disabled = !!errors.email || !!errors.phone;
  }
});
// Отправка заказа
events.on("contacts:submit", () => {
  const orderData = {
    ...buyer.getBuyerData(),
    total: cart.getTotalPrice(),
    items: cart.getItemIds(),
  };

  api
    .createOrder(orderData)
    .then((result) => {
      const success = new Success(successTemplate, () => {
        modal.close();
      });
      success.total = result.total;
      modal.content = success.render();

      // Очищаем данные
      cart.clearCart();
      buyer.clearBuyerData();
    })
    .catch((error) => {
      console.error("Ошибка заказа:", error);
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
