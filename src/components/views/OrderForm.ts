import { Form } from './Form';
import { TPayment } from '../../types';

export class OrderForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  constructor(
    template: HTMLTemplateElement,
    onSubmit: () => void,
    onPaymentChange: (payment: TPayment) => void,
    onAddressChange: (address: string) => void
  ) {
    super(template, onSubmit);
    this.cardButton = this.element.querySelector('button[name="card"]') as HTMLButtonElement;
    this.cashButton = this.element.querySelector('button[name="cash"]') as HTMLButtonElement;
    this.addressInput = this.element.querySelector('input[name="address"]') as HTMLInputElement;
    this.cardButton.addEventListener('click', () => onPaymentChange('card'));
    this.cashButton.addEventListener('click', () => onPaymentChange('cash'));
    this.addressInput.addEventListener('input', () => onAddressChange(this.addressInput.value));
  }
  set payment(value: TPayment) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }
  set address(value: string) {
    this.addressInput.value = value;
  }
}
