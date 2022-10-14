import { first, map, take } from 'rxjs/operators'
import { fromEvent, Observer } from 'rxjs'

const obs$ = fromEvent<MouseEvent>(document, 'click')

const observer: Observer<MouseEvent> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}
const observer2: Observer<{
    clientX: number;
    clientY: number;
}> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}


// this two, has the same result. 
obs$.pipe<MouseEvent>(
    take(1)
).subscribe(observer)

obs$.pipe<MouseEvent>(
    first()
).subscribe(observer)

// but first could work with a conditions: 

obs$.pipe(
    map<MouseEvent, {
        clientX: number;
        clientY: number;
    }>(({ clientX, clientY }) => ({ clientX, clientY })),
    first(({ clientX, clientY }) => (clientX > 400 && clientY > 300))
).subscribe(observer2)
