
import { CardView } from './CardView';
import { categoryMap } from '../../utils/constants';
export class CatalogCard extends CardView {
  protected categoryElement: HTMLSpanElement;
  protected imageElement: HTMLImageElement;
  constructor(template: HTMLTemplateElement, onClick: () => void) {
    super(template);
    this.categoryElement = this.element.querySelector('.card__category') as HTMLSpanElement;
    this.imageElement = this.element.querySelector('.card__image') as HTMLImageElement;
    this.element.addEventListener('click', onClick);
  }
  set category(value: string) {
    this.categoryElement.textContent = value;
    // Удаляем старые модификаторы категории
    const classes = this.categoryElement.className.split(' ').filter(c => !c.startsWith('card__category_'));
    this.categoryElement.className = classes.join(' ');
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
}