import { asyncScheduler } from 'rxjs'

// create a subscription that works like setTimeout or a set Interval
const sayHi = () => console.log('hello me');
const sayHi2 = name => console.log(`hello ${name}`);

// the fist argument is the function and the second is the time when it should do the action
const subs1 = asyncScheduler.schedule(sayHi, 2000)

// if the function require some argument, you should pass it in the third argument of the shedule
const subs2 = asyncScheduler.schedule(sayHi2, 3000, 'Pablo')

// if you want to use it as a setInterval you should pass a clasic function, and make it recursive. 
const subs3 = asyncScheduler.schedule(function (state) {
    console.log('state:', state)

    this.schedule(state + 1, 1000)
}, 4000, 3)

// to unsuscribe you could use a setTimeout or again the asyncScheduller
setTimeout(() => {
    subs3.unsubscribe()
}, 7000)

// this is the same: 
asyncScheduler.schedule(() => subs3.unsubscribe(), 7000)
