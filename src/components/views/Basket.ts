export class Basket {
  protected element: HTMLElement;
  protected listElement: HTMLUListElement;
  protected totalPriceElement: HTMLSpanElement;
  protected submitButton: HTMLButtonElement;
  constructor(template: HTMLTemplateElement, onSubmit: () => void) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.listElement = this.element.querySelector('.basket__list') as HTMLUListElement;
    this.totalPriceElement = this.element.querySelector('.basket__price') as HTMLSpanElement;
    this.submitButton = this.element.querySelector('.basket__button') as HTMLButtonElement;
    
    this.submitButton.disabled = true;

    this.submitButton.addEventListener('click', onSubmit);
  }
  set items(value: HTMLElement[]) {
    this.listElement.replaceChildren(...value);

    this.submitButton.disabled = value.length === 0;
  }
  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  render(): HTMLElement {
    return this.element;
  }
}