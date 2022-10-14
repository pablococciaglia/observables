import { concatMap, switchMap, take } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';

// this will add any new observable that comes to the operator, but it will wait till the
// previous observable is complete () to start the new one.

const interval$ = interval(500).pipe(take(3));
const clicks$ = fromEvent(document, 'click')

// this will start each time from 0 when you click
clicks$.pipe(
    switchMap(() => interval$)
).subscribe(console.log)

// this will wait till the last value is emitted,
// and complete the observable to start again with the next emition
clicks$.pipe(
    concatMap(() => interval$)
).subscribe(console.log)
