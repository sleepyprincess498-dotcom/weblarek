export class Form {
  protected element: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLSpanElement;
  constructor(template: HTMLTemplateElement, onSubmit: () => void) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
    this.submitButton = this.element.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.errorsElement = this.element.querySelector('.form__errors') as HTMLSpanElement;
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      onSubmit();
    });
  }
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
  render(): HTMLFormElement {
    return this.element;
  }
}