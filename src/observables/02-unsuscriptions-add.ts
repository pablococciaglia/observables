import { Observable, Observer } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = new Observable<number>(suscriber => {
    let n: number = 0;
    const intervalo = setInterval(() => {
        n++;
        suscriber.next(n)
    }, 1000);

    setTimeout(() => {
        suscriber.complete()
    }, 2500);

    return () => {
        // the return inside the observable is called when you unsuscribe 
        // or when when suscriber.complete() is excecuted

        clearInterval(intervalo)
    }

})

const subs1 = interval$.subscribe(observer);
const subs2 = interval$.subscribe(num => console.log('Num: ', num));

// chained subscriptions, this way you can unsuscribe all the suscriptions at the same time
subs1.add(subs2);

setTimeout(() => {
    subs1.unsubscribe();
}, 3000);