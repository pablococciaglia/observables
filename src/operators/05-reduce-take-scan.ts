import { from, interval, Observer } from 'rxjs'
import { reduce, scan, take } from 'rxjs/operators'

// the reducer function in JS works on the same way
const numbers = [1, 2, 3, 4, 5, 6]

const totalReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;

const total = numbers.reduce(totalReducer)
console.log('total without initial value', total)

// as a second argument of the reducer method we can pass a initial value, by default is 0
const totalWithSettedInitialValue = numbers.reduce(totalReducer, 4)
console.log('total with initial value', totalWithSettedInitialValue)

const observer: Observer<number> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

// the operator take say how many values will be emitted before the complete, and wont emit anything else after that,
// no matter if the oservable try to emit something else, it wont be showed to the observers
interval(1000).pipe(
    take(3),
)
    .subscribe(observer)

// the operator take is neccesary when you use the reduce here, because it sais when is the end of the interval,
// and based on that calculate the reducer function. and just emit in the end only one value with the result. 
interval(1000).pipe(
    take(3),
    reduce<number, number>(totalReducer),
)
    .subscribe(observer)

// the scan operator is exactly the same, but it emits a value for each time of the interval.
interval(1000).pipe(
    take(3),
    scan<number, number>(totalReducer),
)
    .subscribe(observer)

// when you are working with other operators it doesnt need the take operator.
from(numbers).pipe(
    scan<number, number>(totalReducer),
)
    .subscribe(observer)

// Redux pattern with scan:

type User = {
    id: number;
    name: string;
    auth: boolean;
    token: string | null;
    age?: number;
}
const user: User[] = [
    {
        id: 1,
        name: 'Pablo',
        auth: false,
        token: null,
    },
    {
        id: 1,
        name: 'Pablo',
        auth: true,
        token: '123abc',
    },
    {
        id: 1,
        name: 'Pablo',
        auth: true,
        token: 'xyz456',
    },
]

const state$ = from(user)
    .pipe(
        scan<User, User>((acc, cur) => {
            return { ...acc, ...cur, age: 33 }
        }
        )
    )


state$.subscribe(console.log)

