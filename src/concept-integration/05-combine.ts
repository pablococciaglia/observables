import { interval, timer, Observer, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

const observer: Observer<(string)> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}
const letters = ['a', 'b', 'c', 'd', 'e'];
const numbers = [1, 2, 3, 4, 5];

const letters$ = interval(1000).pipe(
    map(i => letters[i]),
    take(numbers.length)
);

const numbers$ = timer(500, 1000).pipe(
    map(i => numbers[i]),
    take(letters.length)
);



combineLatest(
    [
        letters$,
        numbers$,
    ]
).pipe(
    map(([a, b]) => a + b)
).subscribe(observer)
