import {IBuyer, TPayment, TBuyerErrors} from '../../types/index';
import { IEvents } from '../base/Events';

export class Buyer {
  private payment: TPayment | null = null;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }
  
  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    }
  }

  clearBuyerData(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this.payment) {
      errors.payment = 'Выберите способ оплаты';
    }
    if (!this.email) {
      errors.email = 'Введите email';
    }
    if (!this.phone) {
      errors.phone = 'Введите телефон';
    }
    if (!this.address) {
      errors.address = 'Введите адрес';
    }
    return errors;
  }
}