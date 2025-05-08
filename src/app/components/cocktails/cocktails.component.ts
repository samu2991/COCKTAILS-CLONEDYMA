import { Component, computed, effect, inject, signal } from '@angular/core';
import { CocktailsListComponent } from './components/cocktails-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details.component';
import { CocktailsService } from 'app/shared/services/cocktails.service';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsListComponent, CocktailDetailsComponent],
  template: `
    <app-cocktails-list
      [cocktails]="cocktails()"
      (likedCocktailId)="likedCocktailId($event)"
      (unLikedCocktailId)="unLikedCocktailId($event)"
      [(selectedCocktailId)]="selectedCocktailId"
      [isliked]="cocktailIdIsLiked()"
      class="w-half card"
    />

    @let sc = selectedCocktail(); @if(sc){
    <app-cocktail-details
      [selectedCocktail]="sc"
      (likedCocktailId)="likedCocktailId($event)"
      (unLikedCocktailId)="unLikedCocktailId($event)"
      [isliked]="cocktailIdIsLiked()"
      class="w-half card"
    />
    }
  `,
  styles: `
    :host {
      display: flex;
      gap:24px;
      padding: 24px;
    }
  `,
})
export class CocktailsComponent {
  cocktailsService = inject(CocktailsService);
  cartService = inject(CartService);
  cocktails = computed(
    () => this.cocktailsService.cocktailResource.value() || []
  );
  likedCocktails = computed(() => this.cartService.likedCocktailIds());

  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );

  cocktailIdIsLiked = computed(() => {
    const selectedCocktailId = this.selectedCocktailId();
    return selectedCocktailId
      ? this.likedCocktails().includes(selectedCocktailId)
      : false;
  });

  likedCocktailId(cocktailId: string) {
    this.cartService.likedCocktail(cocktailId);
  }

  unLikedCocktailId(cocktailId: string) {
    this.cartService.unLikedCocktail(cocktailId);
  }

  constructor() {
    effect(() => console.log('Selected cocktail:', this.selectedCocktail()));
    effect(() => console.log('Selected cocktail:', this.likedCocktails()));
    effect(() => console.log('first cocktail:', this.cocktails()));
  }
}
