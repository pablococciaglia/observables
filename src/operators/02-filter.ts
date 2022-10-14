import { filter, from, range } from 'rxjs'

const obs1$ = range(1, 6)

// the operator filter can remove all the values that not match with some conditions
obs1$.pipe(
    filter<number>(value => value === 2)
).subscribe(val => console.log('is 2:', val))

// here you also can get the index if is neccesary
obs1$.pipe(
    filter<number>((value, i) => {
        console.log('this is the index value:', i)
        return value !== 2
    })
).subscribe(val => console.log('is not 2:', val))
obs1$.pipe<number>(
    filter(value => value % 2 === 1)
).subscribe(val => console.log('is not pair:', val))
obs1$.pipe(
    filter<number>(value => value % 2 === 0)
).subscribe(val => console.log('is pair:', val))

type Personaje = {
    type: string;
    name: string;
}

const characters: Personaje[] = [
    {
        type: 'hero',
        name: 'batman'
    },
    {
        type: 'hero',
        name: 'superman'
    },
    {
        type: 'villan',
        name: 'lex luthor'
    },
]

const obs2$ = from(characters)

obs2$.pipe(
    filter<Personaje>(value => value.name === 'batman')
).subscribe(val => console.log('is pair:', val))

obs2$.pipe(
    filter<Personaje>(value => value.type !== 'hero')
).subscribe(val => console.log('is pair:', val))
