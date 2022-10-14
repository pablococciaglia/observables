import { fromEvent, interval, Observer } from 'rxjs'
import { skip, takeUntil } from 'rxjs/operators'

const button = document.createElement('button')
button.innerHTML = 'Stop Timer';
document.querySelector('body').append(button)

const button2 = document.createElement('button')
button2.innerHTML = 'Stop Timer after 3 clicks';
document.querySelector('body').append(button2)


const timerObserver: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const observableTimer$ = interval(1000)

const clickObservable$ = fromEvent<MouseEvent>(button, 'click')

// is a operator that recive another observer, and will stop the emition of one
// operator when recives the first emition of the observable is in the takeUntil
// the operator skip is to omit the fists emitions

// it also could be use if we want to skip the emitions from the ovservable that is in the takeUntil: 
const clickObservable2$ = fromEvent<MouseEvent>(button2, 'click').pipe(skip(2))

observableTimer$.pipe(
    skip(2),
    takeUntil(clickObservable$),
    takeUntil(clickObservable2$),
).subscribe(timerObserver)