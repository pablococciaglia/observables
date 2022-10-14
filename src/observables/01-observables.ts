import { Observable, Observer } from 'rxjs'

const obs$ = new Observable<string>(subscriber => {

    subscriber.next('hello')
    subscriber.next('world')
    // froce an error
    // const a = undefined;
    // a.name = 'pablo';
    subscriber.complete() // from here the subscribers wont listen anymore

});

const observer: Observer<string> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

obs$.subscribe(observer)
