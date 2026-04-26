# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные


## Типы
TPayment — способ оплаты. Может быть "card" (картой) или "cash" (наличными).
TBuyerErrors — объект для хранения ошибок валидации полей покупателя.

### Интерфейсы

#### IPrduct

Описывает товар в магазине.

- id: string - уникальный идентификатор товара
- description: string - описание товара
- image: string - иконка товара
- title: string - название товара
- category: string - категория товара
- price: number - цена товара (может быть null для безценных товаров)

#### IBuyer

Описывает данные покупателя

- payment: TPayment | null - способ оплаты (может быть 'cash' 'card' 'null')
- address: string - адрес доставки
- email: string - почта покупателя
- phone: string - номер телефона покупателя

## Модели данных
### Класс ProductCatalog
Назначение: хранит каталог всех товаров магазина.
Поля:
- products: IProduct[] — массив всех товаров
- selectedProduct: IProduct — товар, выбранный для подробного просмотра
Методы:
- setProducts(products: IProduct[]): void — сохраняет массив товаров
- getProducts(): IProduct[] — возвращает все товары
- getProductById(id: string): IProduct | null — находит товар по его идентификатору
- setSelectedProduct(id: string): void — сохраняет товар для просмотра
- getSelectedProduct(): IProduct | null — возвращает выбранный товар
### Класс Cart
Назначение: хранит товары, которые пользователь добавил в корзину.
Поля:
- items: IProduct[] — массив товаров в корзине
Методы:
- getItems(): IProduct[] — возвращает товары из корзины
- addItem(item: IProduct): void — добавляет товар в корзину
- removeItem(id: string): void — удаляет товар из корзины
- clearCart(): void — очищает всю корзину
- getTotalPrice(): number — считает общую стоимость
- getItemCount(): number — возвращает количество товаров
- hasItem(id: string): boolean — проверяет, есть ли товар в корзине
### Класс Buyer
Назначение: хранит данные покупателя для оформления заказа.
Поля:
- payment: TPayment | null — способ оплаты
- email: string — электронная почта
- phone: string — телефон
- address: string — адрес доставки
Методы:
- setPayment(payment: TPayment): void — сохраняет способ оплаты
- setEmail(email: string): void — сохраняет почту
- setPhone(phone: string): void — сохраняет телефон
- setAddress(address: string): void — сохраняет адрес
- getBuyerData(): IBuyer — возвращает все данные покупателя
- clearBuyerData(): void — очищает все данные
- validate(): TBuyerErrors — проверяет заполненность полей и возвращает ошибки

## слой коммуникации
### Класс AppApi
Назначение: получает товары с сервера и отправляет заказы на сервер
Поля:
- api: IApi - ссылка на api адрес
Методы:
- getProducts(): Promise<ProductListSuccess> - получает товары с сервера
- createOrders(body: OrderBody): Promise<OrderSuccess> - отправляет заказы на сервер



## Слой отображения (View)

### Класс Header
Назначение: отображает шапку сайта с логотипом и кнопкой корзины.
Поля:
- basketButton: HTMLButtonElement — кнопка открытия корзины
- counterElement: HTMLSpanElement — счётчик товаров в корзине
Методы:
- set counter(value: number): void — устанавливает значение счётчика

### Класс Gallery
Назначение: отображает галерею карточек товаров на главной странице.
Поля:
- catalogElement: HTMLElement — контейнер для карточек
Методы:
- set catalog(items: HTMLElement[]): void — устанавливает список карточек в галерею

### Класс Modal
Назначение: управляет модальным окном.
Поля:
- container: HTMLElement — контейнер модального окна
- closeButton: HTMLButtonElement — кнопка закрытия
- contentElement: HTMLElement — область для контента
Методы:
- set content(value: HTMLElement): void — устанавливает содержимое модального окна
- open(): void — открывает модальное окно
- close(): void — закрывает модальное окно

### Класс Card (базовый)
Назначение: базовый класс для всех типов карточек товара.
Поля:
- element: HTMLElement — корневой элемент карточки
- titleElement: HTMLElement — элемент заголовка
- priceElement: HTMLSpanElement — элемент цены
Методы:
- set title(value: string): void — устанавливает название товара
- set price(value: number | null): void — устанавливает цену товара

### Класс CatalogCard extends Card
Назначение: карточка товара для отображения в каталоге.
Поля:
- categoryElement: HTMLSpanElement — элемент категории
- imageElement: HTMLImageElement — изображение товара
Методы:
- set category(value: string): void — устанавливает категорию
- set image(value: string): void — устанавливает изображение

### Класс PreviewCard extends Card
Назначение: карточка товара для подробного просмотра в модальном окне.
Поля:
- categoryElement: HTMLSpanElement — элемент категории
- imageElement: HTMLImageElement — изображение товара
- descriptionElement: HTMLParagraphElement — описание товара
- buttonElement: HTMLButtonElement — кнопка добавления в корзину
Методы:
- set category(value: string): void — устанавливает категорию
- set image(value: string): void — устанавливает изображение
- set description(value: string): void — устанавливает описание
- set buttonText(value: string): void — устанавливает текст кнопки

### Класс BasketCard extends Card
Назначение: карточка товара для отображения в корзине.
Поля:
- indexElement: HTMLSpanElement — порядковый номер товара
- deleteButton: HTMLButtonElement — кнопка удаления из корзины
Методы:
- set index(value: number): void — устанавливает порядковый номер

### Класс Basket
Назначение: отображает содержимое корзины.
Поля:
- listElement: HTMLUListElement — список товаров
- totalPriceElement: HTMLSpanElement — общая сумма
- submitButton: HTMLButtonElement — кнопка оформления заказа
Методы:
- set items(value: HTMLElement[]): void — устанавливает список товаров
- set totalPrice(value: number): void — устанавливает общую сумму

### Класс Form (базовый)
Назначение: базовый класс для всех форм.
Поля:
- formElement: HTMLFormElement — элемент формы
- submitButton: HTMLButtonElement — кнопка отправки
- errorsElement: HTMLSpanElement — элемент для вывода ошибок
Методы:
- set valid(value: boolean): void — устанавливает состояние валидности формы
- set errors(value: string): void — устанавливает текст ошибок
- clear(): void — очищает поля формы

### Класс OrderForm extends Form
Назначение: форма выбора способа оплаты и ввода адреса.
Поля:
- cardButton: HTMLButtonElement — кнопка оплаты картой
- cashButton: HTMLButtonElement — кнопка оплаты при получении
- addressInput: HTMLInputElement — поле ввода адреса
Методы:
- set payment(value: TPayment): void — устанавливает активный способ оплаты
- set address(value: string): void — устанавливает адрес

### Класс ContactsForm extends Form
Назначение: форма ввода контактных данных.
Поля:
- emailInput: HTMLInputElement — поле ввода email
- phoneInput: HTMLInputElement — поле ввода телефона
Методы:
- set email(value: string): void — устанавливает email
- set phone(value: string): void — устанавливает телефон

### Класс Success
Назначение: отображает сообщение об успешном оформлении заказа.
Поля:
- totalElement: HTMLParagraphElement — элемент с суммой заказа
- closeButton: HTMLButtonElement — кнопка закрытия
Методы:
- set total(value: number): void — устанавливает сумму списанных синапсов