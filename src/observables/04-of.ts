import { Observer, of } from 'rxjs';

// Is a sync function. 

const obs$ = of(1, 2, 3, 4, 5, 6);

const numberObserver: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}
console.log('init')
obs$.subscribe(numberObserver)
console.log('end')

const obs2$ = of<any>([1, 2], { a: 1, b: 2 }, true, Promise.resolve(true));

console.log('init2')
obs2$.subscribe(numberObserver)
console.log('end2')
