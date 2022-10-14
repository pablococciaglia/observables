import { from, Observer, of } from 'rxjs';

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const source1$ = of(1, 2, 3, 4, 5, 6)
const source2$ = from([1, 2, 3, 4, 5, 6])

const source3$ = of([1, 2, 3, 4, 5, 6])

const source4$ = of('Pablo')
const source5$ = from('Pablo')

// this two are the same
source1$.subscribe(observer)
source2$.subscribe(observer)

// this will return the only one argument that recived, the array of numbers
source3$.subscribe(observer)

// this will also return the only argument, the complet string
source4$.subscribe(observer)

// if you set a string it will take it like an array of letters, and will emit each leter for emition
source5$.subscribe(observer)

// with from you can return a promess with fetch
const source6$ = from<Promise<Response>>(fetch("https://api.github.com/users/pablococciaglia"))
source6$.subscribe(
    {
        next: async (response: Response) => {
            const dataResponse = await response.json();
            console.log(dataResponse)
        },
        error: error => console.warn('error ', error),
        complete: () => console.info('completed')
    }
)

// also it can work with iterable functions or function generator
const myGenerator = function* () {
    yield 'x';
    yield 'y';
    yield 'z';
    yield '1';
    yield 1;
}

const source7$ = from(myGenerator())

source7$.subscribe(observer)