import { asyncScheduler, interval, Observer } from 'rxjs'

import { throttleTime } from 'rxjs/operators'

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = interval(300);

// is a refractary period when the suscriber wont receive any emition after the last received.
interval$.pipe(
    throttleTime(1000)
).subscribe(observer)

// and this way will return also the last emition during the refractary period
interval$.pipe(
    throttleTime(1000, asyncScheduler, {
        leading: true, // the first element
        trailing: true, // the last element during the throattling time
    })
).subscribe(observer)