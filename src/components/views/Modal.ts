export class Modal {
  protected element: HTMLElement;
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected onClose: () => void;
  protected closeByEscBind: (event: KeyboardEvent) => void;
  constructor(container: HTMLElement, onClose: () => void) {
    this.element = container;
    this.contentElement = this.element.querySelector('.modal__content') as HTMLElement;
    this.closeButton = this.element.querySelector('.modal__close') as HTMLButtonElement;
    this.onClose = onClose;
    // Привязываем контекст
    this.closeByEscBind = this.closeByEsc.bind(this);
    // Клик по крестику
    this.closeButton.addEventListener('click', () => {
      this.onClose();
    });
    // Клик по оверлею
    this.element.addEventListener('click', (event) => {
      if (event.target === this.element) {
        this.onClose();
      }
    });
  }
  // Обработчик Escape
  protected closeByEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }
  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }
  open(): void {
    this.element.classList.add('modal_active');
    document.addEventListener('keydown', this.closeByEscBind);
  }
  close(): void {
    this.element.classList.remove('modal_active');
    this.contentElement.replaceChildren();
    document.removeEventListener('keydown', this.closeByEscBind);
  }
  render(): HTMLElement {
    return this.element;
  }
}
