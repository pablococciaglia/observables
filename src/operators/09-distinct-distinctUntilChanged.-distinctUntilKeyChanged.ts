import { distinct, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators'
import { from, Observer } from 'rxjs'

// this operator only emit values that were not emitted before

const observer: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const source$ = from([1, 2, 3, 4, 5, 6, 2, 6, 8, 0])

source$.pipe(
    distinct()
).subscribe(observer)


type Characters = {
    name: string;
}

const observer2: Observer<Characters> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const source2$ = from<Characters[]>([
    {
        name: 'Scorpion'
    },
    {
        name: 'Sub-Zero'
    },
    {
        name: 'Liu Kang'
    },
    {
        name: 'Jonny Cage'
    },
    {
        name: 'Jonny Cage'
    },
    {
        name: 'Sonya'
    },
    {
        name: 'Rayden'
    },
    {
        name: 'Rayden'
    },
    {
        name: 'Sub-Zero'
    },
])
// it doest work for objects, until you speficy which parameter it should watch.
source2$.pipe(
    distinct()
).subscribe(observer2)

source2$.pipe(
    distinct(c => c.name)
).subscribe(observer2)

const observer3: Observer<Characters> = {
    next: value => console.log('next of distinctUntilChanged', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

// distinctUntilChanged dont emit again a repeated value just compared with the previous one.
// but the way to compare objects is a little different, with a function
source2$.pipe(
    distinctUntilChanged((previous, current) => previous.name === current.name)
).subscribe(observer3)

// distinctUntilKeyChanged is almost the same as before, but you specify which property you are looking at
source2$.pipe(
    distinctUntilKeyChanged('name')
).subscribe(observer3)