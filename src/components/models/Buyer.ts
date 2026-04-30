import {IBuyer, TPayment, TBuyerErrors} from '../../types/index';
import { IEvents } from '../base/Events';

export class Buyer {
  private payment: TPayment | null = null;
  private address: string = '';
  private email: string = '';
  private phone: string = '';
  private events: IEvents;
  constructor(events: IEvents) {
    this.events = events;
  }
  setPayment(value: TPayment): void {
    this.payment = value;
    this.events.emit('buyer:changed');
  }
  setAddress(value: string): void {
    this.address = value;
    this.events.emit('buyer:changed');
  }
  setEmail(value: string): void {
    this.email = value;
    this.events.emit('buyer:changed');
  }
  setPhone(value: string): void {
    this.phone = value;
    this.events.emit('buyer:changed');
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

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clearBuyerData(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit('buyer:changed');
  }

}
