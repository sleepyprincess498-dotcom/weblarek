export class CardView {
  protected element: HTMLElement;
  protected titleElement: HTMLElement;
  protected priceElement: HTMLSpanElement;
  constructor(template: HTMLTemplateElement) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.titleElement = this.element.querySelector('.card__title') as HTMLElement;
    this.priceElement = this.element.querySelector('.card__price') as HTMLSpanElement;
  }
  set title(value: string) {
    this.titleElement.textContent = value;
  }
  set price(value: number | null) {
    if (value === null) {
      this.priceElement.textContent = 'Бесценно';
    } else {
      this.priceElement.textContent = `${value} синапсов`;
    }
  }
  render(): HTMLElement {
    return this.element;
  }
}