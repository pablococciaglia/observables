import { exhaustMap, take } from 'rxjs/operators';
import { fromEvent, interval } from 'rxjs';

const interval$ = interval(500).pipe(take(3));
const clicks$ = fromEvent(document, 'click')

// this will ignore all the subscriptions meanwhile there is one active subscirption. 
// it wont cancel and start again from zero like the switchMap,
// or add to the line of subscriptions like the concatMap.
// i will only ignore.
clicks$.pipe(
    exhaustMap(() => interval$)
).subscribe(console.log)
