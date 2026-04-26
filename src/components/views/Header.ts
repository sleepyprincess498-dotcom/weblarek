
export class Header {
  protected element: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLSpanElement;
  constructor(container: HTMLElement, onBasketClick: () => void) {
    this.element = container;
    this.basketButton = this.element.querySelector('.header__basket') as HTMLButtonElement;
    this.counterElement = this.element.querySelector('.header__basket-counter') as HTMLSpanElement;
    this.basketButton.addEventListener('click', onBasketClick);
  }
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
  render(): HTMLElement {
    return this.element;
  }
}