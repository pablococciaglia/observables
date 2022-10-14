import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { fromEvent, of } from 'rxjs'

import { ajax } from 'rxjs/ajax'

// helper
const httpRequestLogin = (userPass) => (ajax.post('https://reqres.in/api/login?delay=1', userPass)
    .pipe(
        map(res => res.response['token']),
        catchError(err => of('xxx'))
    )
)

const src1 = fromEvent<MouseEvent>(document, 'click');
const src2 = fromEvent<KeyboardEvent>(document, 'keyup');
// create a form
const form = document.createElement('form')
const inputEmail = document.createElement('input')
const inputPass = document.createElement('input')
const submitBtn = document.createElement('button')

// set fields

inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Submit'

form.append(
    inputEmail,
    inputPass,
    submitBtn
)

document.querySelector('body').append(form)

const submitForm$ = fromEvent<SubmitEvent>(form, 'submit').pipe(
    tap(ev => ev.preventDefault()),
    map(({ target }) => ({
        email: target[0].value,
        password: target[1].value,
    })),
    switchMap(httpRequestLogin)
)

submitForm$.subscribe(console.log)
