import { Form } from './Form';
export class ContactsForm extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  constructor(
    template: HTMLTemplateElement,
    onSubmit: () => void,
    onEmailChange: (email: string) => void,
    onPhoneChange: (phone: string) => void
  ) {
    super(template, onSubmit);
    this.emailInput = this.element.querySelector('input[name="email"]') as HTMLInputElement;
    this.phoneInput = this.element.querySelector('input[name="phone"]') as HTMLInputElement;
    this.emailInput.addEventListener('input', () => onEmailChange(this.emailInput.value));
    this.phoneInput.addEventListener('input', () => onPhoneChange(this.phoneInput.value));
  }
  set email(value: string) {
    this.emailInput.value = value;
  }
  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
