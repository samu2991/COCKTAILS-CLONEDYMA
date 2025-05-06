import {
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktails-list',
  imports: [FormsModule],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <input
      type="text"
      class="mb-20"
      placeholder="chercher un cocktail"
      [(ngModel)]="search"
    />
    <ul class="mb-20">
      @for (cocktail of filteredCocktails(); track cocktail.name) {
      <li
        class="px-12 py-6 item"
        [class.active-item]="cocktail._id === selectedCocktailId()"
        (click)="selectedCocktailId.set(cocktail._id)"
      >
        <h3>{{ cocktail.name }}</h3>
      </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .item {
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
      margin-bottom: 8px;
      border-radius: 24px;
    }
    .item:hover { background-color:#e9d5ff; }
    .active-item { background-color: #7e22ce; }
  `,
})
export class CocktailsListComponent {
  search = signal<string>('');
  cocktails = input<Cocktail[]>();

  selectedCocktailId = model<string | null>(null);

  filteredCocktails = computed(() =>
    this.cocktails()?.filter((c) =>
      c.name.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  constructor() {
    effect(() => console.log('Selected cocktail:', this.filteredCocktails()));
    effect(() => console.log('cocktail:', this.cocktails()));
  }
}
