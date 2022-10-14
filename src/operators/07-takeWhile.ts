import { fromEvent, Observer } from 'rxjs'
import { map, takeWhile } from 'rxjs/operators'

const obs$ = fromEvent<MouseEvent>(document, 'click')

const observer: Observer<{
    x: number;
    y: number;
}> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

// takeWhile will emit values untill the condition is met. this way do not emit the value that trigger the complete()
obs$.pipe(
    map<MouseEvent, {
        x: number;
        y: number;
    }>(({ x, y }) => ({ x, y })),
    takeWhile(({ x, y }) => (x > 100 && y > 100))
).subscribe(observer)


// if we send a second parameter as true you can get the last value that brake the condition also.  
obs$.pipe(
    map<MouseEvent, {
        x: number;
        y: number;
    }>(({ x, y }) => ({ x, y })),
    takeWhile(({ x, y }) => (x > 100 && y > 100), true)
).subscribe(observer)
