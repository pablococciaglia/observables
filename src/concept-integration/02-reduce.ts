// sum of all the numbers and remove the strings

import { Observer, filter, from } from 'rxjs';

import { reduce } from 'rxjs/operators';

const observer: Observer<number> = {
  next: value => console.log('next ', value),
  error: error => console.warn('error ', error),
  complete: () => console.info('completed')
};


const datos = [1, 2, 'foo', 3, 5, 6, 'bar', 7, 8];
const totalReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
from(datos).pipe(
  filter<any>(m => m > 0),
  reduce(totalReducer),

).subscribe(observer)
