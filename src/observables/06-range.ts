import { asyncScheduler, observeOn, of, range } from 'rxjs'

const src1$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

const src2$ = range(1, 10)
const src3$ = range(-5, 10) //the arguments are "start value" and "how many emitions you want"
const src4$ = range(5) // if you only set 1 argument will be the quantity of emitions, and the default value for the start value will be 0
const src5$ = range(1, 5).pipe(observeOn(asyncScheduler)) // if you only set 1 argument will be the quantity of emitions, and the default value for the start value will be 0


console.log('of start')
src1$.subscribe(console.log)
console.log('of end')
console.log('range start')
src2$.subscribe(console.log)
console.log('range end')
console.log('range start')
src3$.subscribe(console.log)
console.log('range end')
console.log('range with one argument start')
src4$.subscribe(console.log)
console.log('range with one argument end')
console.log('range with one argument start')
src5$.subscribe(console.log)
console.log('ups, what did happen here? isn`t it the end?')
