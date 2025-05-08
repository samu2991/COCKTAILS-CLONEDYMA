import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktails-list',
  imports: [FormsModule],
  host: { '(window:keydown)': 'keyboardInteraction($event)' },
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <input
      type="text"
      class="mb-20"
      #search2
      placeholder="chercher un cocktail"
      [(ngModel)]="search"
    />
    <ul class="mb-20">
      @if(cocktails()){ @for (cocktail of filteredCocktails(); track
      cocktail.name) {
      <li
        class="px-12 py-6 item"
        [class.active-item]="cocktail._id === selectedCocktailId()"
        (click)="selectedCocktailId.set(cocktail._id)"
      >
        <h3>{{ cocktail.name }}</h3>
      </li>
      } }
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
  filter = signal('');
  cocktails = input.required<Cocktail[]>();
  search2 = viewChild<ElementRef<HTMLInputElement>>('search2');
  likedCocktailId = output<string>();
  unLikedCocktailId = output<string>();
  isliked = input.required<boolean>();

  selectedCocktailId = model<string | null>(null);

  filteredCocktails = computed(() => {
    const cocktails = this.cocktails();
    return cocktails.filter((cocktail) =>
      cocktail?.name?.toLowerCase()?.includes(this.filter().toLowerCase())
    );
  });

  keyboardInteraction({ key }: KeyboardEvent) {
    switch (key) {
      case 'Escape': {
        this.selectedCocktailId.set(null);
        break;
      }
      case 'Enter': {
        const selectedCocktailId = this.selectedCocktailId();
        if (selectedCocktailId) {
          this.isliked()
            ? this.unLikedCocktailId.emit(selectedCocktailId)
            : this.likedCocktailId.emit(selectedCocktailId);
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown': {
        const selectedCocktailId = this.selectedCocktailId();
        const cocktails = this.cocktails();
        if (cocktails?.length) {
          if (selectedCocktailId) {
            const index = cocktails.findIndex(
              ({ _id }) => _id === selectedCocktailId
            );

            if (key === 'ArrowDown') {
              const nextCocktailIndex =
                index === cocktails.length - 1 ? 0 : index + 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            } else {
              const nextCocktailIndex =
                index === 0 ? cocktails.length - 1 : index - 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            }
          } else {
            if (key === 'ArrowDown') {
              const { _id } = cocktails[0];
              this.selectedCocktailId.set(_id);
            } else {
              const { _id } = cocktails.at(-1)!;
              this.selectedCocktailId.set(_id);
            }
          }
        }

        break;
      }

      default: {
        console.log(key);
        this.search2()?.nativeElement.focus();
      }
    }
  }

  constructor() {
    effect(() => console.log('Selected cocktail:', this.filteredCocktails()));
    effect(() => console.log('cocktail:', this.cocktails()));
  }
}
