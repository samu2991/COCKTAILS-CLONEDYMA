import { Component } from '@angular/core';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    <img class="mb-20" [src]="cocktail.imageUrl" />
    <h3 class="mb-20">{{ cocktail.name }}</h3>
    <p class="mb-20">{{ cocktail.description }}</p>
    <div>
      <button class="btn btn-primary">Ajouter cocktail</button>
    </div>
  `,
  styles: `
    :host {
      display:flex;
      flex-direction:column
    }
  `,
})
export class CocktailDetailsComponent {
  cocktail: Cocktail = {
    imageUrl:
      'https://static.750g.com/images/1200-675/dfe52623942a8b2e6b4f1e1715a42570/servez-et-degustez.jpg',
    name: 'Mojito',
    description: `
        Le mojito est un cocktail classique cubain, idéal pour les moments de détente. Composé de rhum blanc, de feuilles de menthe fraîche, de jus de citron vert, de sucre, d'eau gazeuse et de glace pilée, il offre un équilibre parfait entre fraîcheur, acidité et douceur, avec des arômes rafraîchissants et tropicaux.
      `,
  };
}
