/**
 * countdown from 7 to 0
 */

import { Observer, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

const observer: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
};

const init = 7;
const countdown$ = interval(700).pipe(
    map((number) => init - number),
    take(init + 1)
);
countdown$.subscribe(observer);
