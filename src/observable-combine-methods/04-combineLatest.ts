import { Observer, combineLatest, fromEvent } from 'rxjs'

import { map } from 'rxjs/operators'

const observer: Observer<(string | number)[]> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup')
const click$ = fromEvent<MouseEvent>(document, 'click')

// the combineLatest function will emit the fist value when all the observables inside at least emit
// one value and the value will be an array with the last value of each observable, in the order 
// they where declared


combineLatest(
    [
        keyup$.pipe(
            map(ev => ev.key)
        ),
        click$.pipe(
            map(ev => ev.x)
        ),
    ]
).subscribe(observer)

const input1 = document.createElement('input')
const input2 = document.createElement('input')

input1.placeholder = 'Primer valor'
input2.placeholder = 'Segundo valor'

input2.type = 'password'

document.querySelector('body').append(input1, input2)

// helper Function
const getInputStram = (element: HTMLInputElement) =>
    fromEvent<KeyboardEvent>(element, 'keyup').pipe(
        map<KeyboardEvent, string>(({ target }) => target['value'])
    )

combineLatest(
    [
        getInputStram(input1),
        getInputStram(input2),
    ]
).subscribe(observer)  
