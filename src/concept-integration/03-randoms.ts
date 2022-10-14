import { Subject, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

// == DONT TOUCHE observable ====================
const reloj$ = interval(1000).pipe(
  take(5),
  map(val => Math.round(Math.random() * 100))
);
// == DONT TOUCHE observable ====================


const subject$ = new Subject()

reloj$.subscribe(subject$)


// these observables should emit the same value
subject$.subscribe(val => console.log('obs1', val));
subject$.subscribe(val => console.log('obs2', val));

