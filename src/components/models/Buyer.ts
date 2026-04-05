import {IBuyer, TPayment, TBuyerErrors} from '../../types/index';

export class Buyer {
  private _payment: TPayment | null = null;
  private _email: string | '' = '';
  private _phone: string | '' = '';
  private _address: string | '' = '';

  setPayment(payment: TPayment): void {
    this._payment = payment;
  }

  setEmail(email: string): void {
    this._email = email;
  }
  
  setPhone(phone: string): void {
    this._phone = phone;
  }

  setAddress(address: string): void {
    this._address = address;
  }

  getBuyerData(): IBuyer | null {
    if (!this._payment) return null
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address
    }
  }

  clearBuyerData(): IBuyer | null {
    return {
      payment: null,
      email: '',
      phone: '',
      address: ''
    }
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};
    if (!this._payment) {
      errors.payment = 'Выберите способ оплаты';
    }
    if (!this._email) {
      errors.email = 'Введите email';
    }
    if (!this._phone) {
      errors.phone = 'Введите телефон';
    }
    if (!this._address) {
      errors.address = 'Введите адрес';
    }
    return errors;
  }

  isValid(): boolean {
    return !!(this._email && this._payment && this._phone && this._address);
  }
}