import { Form } from './Form';
import { TPayment } from '../../types';

interface IOrderFormCallbacks {
  onPaymentChange: (payment: TPayment) => void;
  onAddressChange: (address: string) => void;
  onSubmit: () => void;
}
export class OrderForm {
  protected element: HTMLElement;
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  constructor(template: HTMLTemplateElement, callbacks: IOrderFormCallbacks) {
    this.element = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
    
    this.cardButton = this.element.querySelector('[name="card"]') as HTMLButtonElement;
    this.cashButton = this.element.querySelector('[name="cash"]') as HTMLButtonElement;
    this.addressInput = this.element.querySelector('[name="address"]') as HTMLInputElement;
    this.submitButton = this.element.querySelector('.order__button') as HTMLButtonElement;
    this.errorsElement = this.element.querySelector('.form__errors') as HTMLElement;
    this.cardButton.addEventListener('click', () => {
      this.setActivePayment('card');
      callbacks.onPaymentChange('card');
    });
    this.cashButton.addEventListener('click', () => {
      this.setActivePayment('cash');
      callbacks.onPaymentChange('cash');
    });
    this.addressInput.addEventListener('input', () => {
      callbacks.onAddressChange(this.addressInput.value);
    });
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      callbacks.onSubmit();
    });
  }
  protected setActivePayment(payment: TPayment): void {
    this.cardButton.classList.toggle('button_alt-active', payment === 'card');
    this.cashButton.classList.toggle('button_alt-active', payment === 'cash');
  }
  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }
  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
  set address(value: string) {
  this.addressInput.value = value;
  }
  set payment(value: TPayment | null) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }
  clear(): void {
    this.addressInput.value = '';
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
  }
  render(): HTMLElement {
    return this.element;
  }
}
