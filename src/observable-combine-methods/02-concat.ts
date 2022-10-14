import { Observer, concat, interval, of } from 'rxjs'

import { take } from 'rxjs/operators'

const observer: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = interval(1000)

// function concat just accepts a list of Observables and subscribes to them one after another
// when the previous Observable completes.

concat(
    interval$.pipe(take(2)),
    interval$.pipe(take(5)),
    [2000, 1, 2, 3, 4],
    interval$.pipe(take(1)),
    of(1000, 1, 2, 3, 4, 5)
).subscribe(observer)

// difference with concatMap: concatMap accepts as a parameter a function that is invoked for
// every item from its source and that returns an inner Observable
// (it maps each item from its source to an Observable).
// concatMap then calls its callback only when the previous inner Observables completes.

