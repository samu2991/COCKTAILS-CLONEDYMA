import { Component, input } from '@angular/core';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  template: `
    @let c = selectedCocktail();
    <div class="imageCenter">
      <img class="mb-20" [src]="c.imageUrl" />
    </div>

    <h3 class="mb-20">{{ c.name }}</h3>
    <p class="mb-20">{{ c.description }}</p>
    <h3>recette</h3>
    <ul class="ingredient">
      @for (ingredient of c.ingredients; track ingredient) {
      <li>{{ ingredient }}</li>
      }
    </ul>
  `,
  styles: `
    :host {
      display:flex;
      flex-direction:column
    }
    img {
      max-height: 300px;
    }
    .imageCenter{
    display: flex;
    justify-content: center;
    }
  `,
})
export class CocktailDetailsComponent {
  selectedCocktail = input.required<Cocktail>();
}
