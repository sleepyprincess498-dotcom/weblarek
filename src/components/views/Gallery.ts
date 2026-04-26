export class Gallery {
  protected element: HTMLElement;
  constructor(container: HTMLElement) {
    this.element = container;
  }
  set catalog(items: HTMLElement[]) {
    this.element.replaceChildren(...items);
  }
  render(): HTMLElement {
    return this.element;
  }
}