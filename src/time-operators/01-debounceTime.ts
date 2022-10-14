import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { fromEvent, Observer } from 'rxjs'

const button = document.createElement('button')
button.innerHTML = 'Stop Timer';
document.querySelector('body').append(button)


const clickObserver: Observer<MouseEvent> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const clickObservable$ = fromEvent<MouseEvent>(button, 'click')

// this will wait 3 seconds after the last emition, and only will emit the last emition. 
// so if you click repeated times for 20 seconds, just in the second 23 you will get the last value
clickObservable$.pipe(
    debounceTime(3000)
).subscribe(clickObserver)




const keyboardObserver: Observer<string> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const input = document.createElement('input')
document.querySelector('body').append(input)

const keyboardObservable$ = fromEvent<KeyboardEvent>(input, 'keyup')

keyboardObservable$.pipe(
    map((ev) => {

        return (ev.target as HTMLInputElement).value
    }),
    debounceTime(1000),
    distinctUntilChanged()
).subscribe(keyboardObserver)