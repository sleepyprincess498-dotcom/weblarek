export class Modal {
  protected element: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;
  constructor(container: HTMLElement, onClose: () => void) {
    this.element = container;
    this.closeButton = this.element.querySelector('.modal__close') as HTMLButtonElement;
    this.contentElement = this.element.querySelector('.modal__content') as HTMLElement;
    this.closeButton.addEventListener('click', onClose);
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        onClose();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.element.classList.contains('modal_active')) {
        onClose();
      }
    });
  }
  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
  open(): void {
    this.element.classList.add('modal_active');
  }
  close(): void {
    this.element.classList.remove('modal_active');
  }
  render(): HTMLElement {
    return this.element;
  }
}