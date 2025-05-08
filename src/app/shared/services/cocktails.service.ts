import { Injectable, resource } from '@angular/core';
import { Cocktail } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  BASE_URL = 'https://restapi.fr/api/cocktailsSam2';

  cocktailResource = resource({
    loader: async (): Promise<Cocktail[]> =>
      (await fetch(this.BASE_URL)).json(),
  });

  constructor() {}
}
