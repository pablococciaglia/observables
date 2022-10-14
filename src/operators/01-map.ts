import { fromEvent, range } from 'rxjs'

import { map } from 'rxjs/operators'

const obs1$ = range(1, 6)
const obs2$ = fromEvent<KeyboardEvent>(document, 'keyup')

// all the operators will be into the pipe function
// the operator map is working like a forEach, all the operators should return a value
obs1$.pipe(
    map<number, number>(value => value * 10)
).subscribe(console.log)

obs1$.pipe(
    map<number, string>(value => (value * 10).toString())
).subscribe(console.log)

obs2$.pipe(
    map<KeyboardEvent, string>(({ code }) => code)
).subscribe(console.log)
