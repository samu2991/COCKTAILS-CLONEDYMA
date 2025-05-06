import { Component, computed, effect, inject, signal } from '@angular/core';
import { CocktailsListComponent } from './components/cocktails-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details.component';
import { CocktailsService } from 'app/shared/services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsListComponent, CocktailDetailsComponent],
  template: `
    <app-cocktails-list
      [cocktails]="cocktails()"
      [(selectedCocktailId)]="selectedCocktailId"
      class="w-half card"
    />

    @let sc = selectedCocktail(); @if(sc){
    <app-cocktail-details [selectedCocktail]="sc" class="w-half card" />
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
  cocktails = computed(
    () => this.cocktailsService.cocktailResource.value() || []
  );

  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );

  constructor() {
    effect(() => console.log('Selected cocktail:', this.selectedCocktail()));
  }
}
