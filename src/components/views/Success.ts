export class Success {
  protected element: HTMLElement;
  protected totalElement: HTMLParagraphElement;
  protected closeButton: HTMLButtonElement;
  constructor(template: HTMLTemplateElement, onClose: () => void) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.totalElement = this.element.querySelector('.order-success__description') as HTMLParagraphElement;
    this.closeButton = this.element.querySelector('.order-success__close') as HTMLButtonElement;
    this.closeButton.addEventListener('click', onClose);
  }
  set total(value: number) {
    this.totalElement.textContent = `Списано ${value} синапсов`;
  }
  render(): HTMLElement {
    return this.element;
  }
}
