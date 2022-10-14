import { interval, Observer, timer } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = interval(5000);
const timer1$ = timer(5000);
const timer2$ = timer(2000, 1000);


const nowPlus10Seconds = new Date()
nowPlus10Seconds.setSeconds(nowPlus10Seconds.getSeconds() + 5)
const timer3$ = timer(nowPlus10Seconds);

console.log('start interval emition')
interval$.subscribe(observer)
console.log('this is to show that interval is an async code')

// the timer is setted to launch the complete instruction when the setted time of the timer finish.
console.log('start timer')
timer1$.subscribe(observer)
console.log('this is to show that timer is an async code')

// with a second argument on the timer, you are creating an "interval" (setted in the second argument)
// that start in the time setted on the first argument
console.log('start timer as interval')
timer2$.subscribe(observer)

// you can set the timer with a date, it will work the same way as with the number,
// its helpfull to program specific time/date to emit a value
console.log('start timer with date()')
timer3$.subscribe(observer)