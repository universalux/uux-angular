import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, input, TemplateRef } from '@angular/core';
import { CardImage } from './ng-image-card.types';

@Component({
  standalone: true,
  selector: 'ng-image-card',
  imports: [CommonModule],
  templateUrl: './ng-image-card.html',
  styleUrl: './ng-image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgImageCard {

  @ContentChild('cardHeader') cardHeader!: TemplateRef<any>;
  @ContentChild('cardBody') cardBody!: TemplateRef<any>;
  @ContentChild('cardFooter') cardFooter!: TemplateRef<any>;

  cardImage = input<CardImage | null>(null);
}
