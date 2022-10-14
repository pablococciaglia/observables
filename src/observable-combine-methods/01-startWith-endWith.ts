import { endWith, startWith } from 'rxjs/operators'

import { ajax } from 'rxjs/ajax'
import { range } from 'rxjs'

const obs1$ = range(1, 6)

// the startWith operator just force the first emitted value
// and endWith is the same for the last value emitted

obs1$.pipe(
    startWith('a'),
    endWith('b')
).subscribe(console.log)

// references
const loadingDiv = document.createElement('div')
loadingDiv.classList.add('loading')
loadingDiv.innerText = 'loading...'

const body = document.querySelector('body')

// Stream
ajax.getJSON('https://reqres.in/api/user/2?delay=3')
    .pipe(
        startWith(true),
        endWith(false)
    )
    .subscribe(res => {
        if (res === true) {
            body.append(loadingDiv)
        } else if (res === false) {
            document.querySelector('.loading').remove()
        }
        console.log(res)
    })
