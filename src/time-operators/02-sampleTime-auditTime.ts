import { auditTime, map, sampleTime } from 'rxjs/operators'
import { fromEvent, interval, Observer } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}

const interval$ = interval(400);

// since the fist emition it will show the last emition on the interval of the sampleTime
// the sampleTime internally has a interval function, and in this case the loop starts each 3 seconds
// and always will show the last emition in those 3 seconds, if nothing happen, it wont emit anything
interval$.pipe(
    sampleTime(3000)
).subscribe(observer)



const clickObserver: Observer<{
    x: number;
    y: number;
}> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
}
const obs$ = fromEvent<MouseEvent>(document, 'click')

// be careful with the order of the operators, for example, here we are processing with the map
// some values that will be cutted by the sampleTime, you can have a better performance if 
// you set the sampleTime (or any other operator that cut emitions) before.
obs$.pipe(
    map<MouseEvent, {
        x: number;
        y: number;
    }>(({ x, y }) => ({ x, y })),
    sampleTime(6000)
).subscribe(clickObserver)


// auditTime is very similar, but the difference is that each time that emit a value, it will start the counter
// on this case it doesnt work with an fixed interval. the emition trigger the timer.
// if the observable complete before during the auditTime period it wont show anything
interval$.pipe(
    auditTime(3000)
).subscribe(observer)
