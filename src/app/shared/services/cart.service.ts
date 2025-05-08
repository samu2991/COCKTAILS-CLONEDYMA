import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  likedCocktailIds = signal<string[]>([]);

  likedCocktail(cocktailId: string) {
    this.likedCocktailIds.update((likedCocktail) => [
      ...likedCocktail,
      cocktailId,
    ]);
  }
  unLikedCocktail(cocktailId: string) {
    this.likedCocktailIds.update((likedCocktail) =>
      likedCocktail.filter((id) => id !== cocktailId)
    );
  }

  constructor() {
    effect(() => console.log('Selected cocktail:', this.likedCocktailIds()));
  }
}
