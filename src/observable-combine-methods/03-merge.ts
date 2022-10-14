import { Observer, fromEvent, merge } from 'rxjs'

import { map } from 'rxjs/operators'

const observer: Observer<string> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const keyup$ = fromEvent(document, 'keyup')
const click$ = fromEvent(document, 'click')

// the merge function just smash different observables and only one observable

merge(
    keyup$.pipe(
        map(ev => ev.type)
    ),
    click$.pipe(
        map(ev => ev.type)
    ),
).subscribe(observer)
