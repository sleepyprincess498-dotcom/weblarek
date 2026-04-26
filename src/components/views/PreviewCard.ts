import { CardView } from './CardView';
import { categoryMap } from '../../utils/constants';
export class PreviewCard extends CardView {
  protected categoryElement: HTMLSpanElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLParagraphElement;
  protected buttonElement: HTMLButtonElement;
  constructor(template: HTMLTemplateElement, onButtonClick: () => void) {
    super(template);
    this.categoryElement = this.element.querySelector('.card__category') as HTMLSpanElement;
    this.imageElement = this.element.querySelector('.card__image') as HTMLImageElement;
    this.descriptionElement = this.element.querySelector('.card__text') as HTMLParagraphElement;
    this.buttonElement = this.element.querySelector('.card__button') as HTMLButtonElement;
    this.buttonElement.addEventListener('click', onButtonClick);
  }
  set category(value: string) {
  this.categoryElement.textContent = value;
  
    // Удаляем старые модификаторы
    this.categoryElement.className = 'card__category';
  
    // Добавляем новый модификатор
    const modifier = categoryMap[value];
    if (modifier) {
      this.categoryElement.classList.add(`card__category_${modifier}`);
    }
  }

  set image(value: string) {
    this.imageElement.src = value;
    this.imageElement.alt = this.titleElement.textContent || '';
  }
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }
  set buttonDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
