import { fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'

const obs$ = fromEvent<KeyboardEvent>(document, 'keyup')

// tap is a method to manage side effects, is doesnt return any value.
obs$.pipe(
    tap((value) => console.log(value.code))
).subscribe(console.log)

// And even it doesnt need to work with the values that are recived
obs$.pipe(
    tap(() => console.log('hello!'))
).subscribe(console.log)

// Also you can use it like an observer
obs$.pipe(
    tap
        (
            {
                next: val => console.log(val),
                error: err => console.log(err),
                complete: () => console.log('complete'),
            }
        )
).subscribe(console.log)

// it could be usefull to depure the code and watch how is flowing the info throgh the different operators
// simulate erros, next and complete
