import { fromEvent, interval, Observer } from 'rxjs'
import { sample, take } from 'rxjs/operators'

const observer: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = interval(400);
const obs$ = fromEvent<MouseEvent>(document, 'click')

// the operator sample will show the last value emitted when another operator emit its value
// and it wont repeat the emition if you click many times in the same interval of time.
// It will show only one emition for each period
interval$.pipe(
    sample(obs$)
).subscribe(observer)

// if the operator is completed it wont emit anything 
// so it wont show the last if you click after the complete
interval$.pipe(
    take(6),
    sample(obs$)
).subscribe(observer)