import { Form } from './Form';
interface IContactsFormCallbacks {
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onSubmit: () => void;
}
export class ContactsForm {
  protected element: HTMLElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  constructor(template: HTMLTemplateElement, callbacks: IContactsFormCallbacks) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    
    this.emailInput = this.element.querySelector('[name="email"]') as HTMLInputElement;
    this.phoneInput = this.element.querySelector('[name="phone"]') as HTMLInputElement;
    this.submitButton = this.element.querySelector('.button') as HTMLButtonElement;
    this.errorsElement = this.element.querySelector('.form__errors') as HTMLElement;
    this.emailInput.addEventListener('input', () => {
      callbacks.onEmailChange(this.emailInput.value);
    });
    this.phoneInput.addEventListener('input', () => {
      callbacks.onPhoneChange(this.phoneInput.value);
    });
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      callbacks.onSubmit();
    });
  }
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
  set email(value: string) {
  this.emailInput.value = value;
  }
  set phone(value: string) {
    this.phoneInput.value = value;
  }
  clear(): void {
    this.emailInput.value = '';
    this.phoneInput.value = '';
  }
  render(): HTMLElement {
    return this.element;
  }
}