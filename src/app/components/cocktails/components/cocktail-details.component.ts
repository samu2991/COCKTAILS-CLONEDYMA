import { Component, input, output } from '@angular/core';
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
      @for (ingredient of c.ingredients; track $index) {
      <li>{{ ingredient }}</li>
      }
    </ul>
    <div class="detailBottom">
      @if(isliked()){
      <button class="btn btn-unlike" (click)="unLikedCocktailId.emit(c._id)">
        unlike !
      </button>
      } @else {
      <button class="btn btn-like" (click)="likedCocktailId.emit(c._id)">
        like !
      </button>

      }
    </div>
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
    .detailBottom{
      padding:20px;
      display:flex;
      justify-content: flex-end;
    }
    .likeButton{

    }
  `,
})
export class CocktailDetailsComponent {
  selectedCocktail = input.required<Cocktail>();
  isliked = input.required<boolean>();
  likedCocktailId = output<string>();
  unLikedCocktailId = output<string>();
}
