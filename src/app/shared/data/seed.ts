import { cocktails } from './cocktails.data';

export async function seedData() {
  await fetch('https://restapi.fr/api/cocktailsSam2', {
    method: 'POST',
    body: JSON.stringify(cocktails),
    headers: {
      'content-type': 'application/json',
    },
  });
}
