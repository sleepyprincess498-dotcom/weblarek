import { Form } from './Form';
import { TPayment } from '../../types';

interface IOrderFormCallbacks {
  onPaymentChange: (payment: TPayment) => void;
  onAddressChange: (address: string) => void;
  onSubmit: () => void;
}

export class OrderForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  constructor(template: HTMLTemplateElement, callbacks: IOrderFormCallbacks) {
    super(template, callbacks.onSubmit);
    this.cardButton = this.element.querySelector('[name="card"]') as HTMLButtonElement;
    this.cashButton = this.element.querySelector('[name="cash"]') as HTMLButtonElement;
    this.addressInput = this.element.querySelector('[name="address"]') as HTMLInputElement;
    this.cardButton.addEventListener('click', () => {
      callbacks.onPaymentChange('card');
    });
    this.cashButton.addEventListener('click', () => {
      callbacks.onPaymentChange('cash');
    });
    this.addressInput.addEventListener('input', () => {
      callbacks.onAddressChange(this.addressInput.value);
    });
  }
  set address(value: string) {
    this.addressInput.value = value;
  }
  set payment(value: TPayment | null) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }
}