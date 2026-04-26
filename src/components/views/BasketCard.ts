
import { CardView } from './CardView'
export class BasketCard extends CardView {
  protected indexElement: HTMLSpanElement;
  protected deleteButton: HTMLButtonElement;
  constructor(template: HTMLTemplateElement, onDelete: () => void) {
    super(template);
    this.indexElement = this.element.querySelector('.basket__item-index') as HTMLSpanElement;
    this.deleteButton = this.element.querySelector('.basket__item-delete') as HTMLButtonElement;
    this.deleteButton.addEventListener('click', onDelete);
  }
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
