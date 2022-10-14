import { Observable, Observer, Subject } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = new Observable<number>(subs => {
    const intervalID = setInterval(
        () => subs.next(Math.random()), 3000
    )

    return () => clearInterval(intervalID)
})

// if you call this way a suscription, you are creating a new instance
// so if you call this twice, the values will not the same, because
// will be two different instance of the Observable emiting random numbers
const subs1 = interval$.subscribe(console.log)


// Subject() is multi-casting, so  if many suscribers call this, they will always recive the same info,
// there will be only one instance
// also this is always an OBSERVER at the same time, so you also can send it as an argument to the suscribe
// also manage next, error and complete

const subject$ = new Subject()

interval$.subscribe(subject$)

const subs2 = subject$.subscribe(num => console.log('1', num))
const subs3 = subject$.subscribe(num => console.log('2', num))
// this way will always return the same values, because there is only one instance of the observable

setTimeout(() => {
    subject$.next(10)
    subject$.complete()
}, 5500);

// this way you can introduce a value into the observable and force the complete() command
// If the data is produces by the observable, it is called a COLD OBSERVABLE, but
// when the data is produced ousside the observable, its called HOT OBSERVABLE
// the Subject can change which kind of observable is it
// be carefull because this doesnt destroy all the instances, if there are other suscribers you should unsuscribe them also.

setTimeout(() => {
    subject$.next(10)
    subject$.complete()
    subs1.unsubscribe()
}, 5500);

