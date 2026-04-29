export class Form {
  protected element: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  constructor(template: HTMLTemplateElement, onSubmit: () => void) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLFormElement;
    
    this.submitButton = this.element.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.errorsElement = this.element.querySelector('.form__errors') as HTMLElement;
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      onSubmit();
    });
  }
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
  render(): HTMLElement {
    return this.element;
  }
}
