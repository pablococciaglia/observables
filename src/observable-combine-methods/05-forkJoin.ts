import { Observer, forkJoin, fromEvent, of } from 'rxjs'
import { catchError, map, take } from 'rxjs/operators'

import { ajax } from 'rxjs/ajax'

const observer: Observer<(string | number)[]> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

// the forkJoin function will emit one value with the array of the last emition of each observable 
// inside when all the observables inside complete().

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

forkJoin(
    [
        getInputStram(input1).pipe(
            take(2)),
        getInputStram(input2).pipe(
            take(4)),
    ]
).subscribe(observer)

// the most common use of the forkJoin is to perform multiples ajax request,
// and it works like a "promisAll"

const GITHUB_API_URL = "https://api.github.com/users"
const GITHUB_USER = 'pablococciaglia'

forkJoin(
    {
        user: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
        gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
        repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`),
    }
).pipe(
    catchError(err => of(err.message))
).subscribe(console.log)


// at this case if you have an error in any of this request you wont receive anything.
// f you want to get the rest of the values you need to manage the error in an independent way: 

forkJoin(
    {
        user: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`).pipe(
            catchError(err => of(err.message))
        ),
        gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`).pipe(
            catchError(err => of(err.message))
        ),
        repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`).pipe(
            catchError(err => of(err.message))
        ),
    }
).subscribe(console.log)
