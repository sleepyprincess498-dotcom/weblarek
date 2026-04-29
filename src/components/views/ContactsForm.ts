import { Form } from './Form';
interface IContactsFormCallbacks {
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onSubmit: () => void;
}

export class ContactsForm extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  constructor(template: HTMLTemplateElement, callbacks: IContactsFormCallbacks) {
    super(template, callbacks.onSubmit);
    this.emailInput = this.element.querySelector('[name="email"]') as HTMLInputElement;
    this.phoneInput = this.element.querySelector('[name="phone"]') as HTMLInputElement;
    this.emailInput.addEventListener('input', () => {
      callbacks.onEmailChange(this.emailInput.value);
    });
    this.phoneInput.addEventListener('input', () => {
      callbacks.onPhoneChange(this.phoneInput.value);
    });
  }
  set email(value: string) {
    this.emailInput.value = value;
  }
  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
