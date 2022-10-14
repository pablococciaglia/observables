// return the first in capital letters
import { Observer, from } from 'rxjs';

import { map } from 'rxjs/operators';

const names = ['batman', 'joker', 'two-faces', 'penguin', 'poison ivy'];

const observer: Observer<string> = {
  next: value => console.log('next ', value),
  error: error => console.warn('error ', error),
  complete: () => console.info('completed')
};

const source$ = from(names)
source$.pipe(
  map((name: string) => name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())),
).subscribe(observer)
