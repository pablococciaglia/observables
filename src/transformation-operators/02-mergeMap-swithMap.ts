import { GithubInterface, Users } from '../interfaces/github-users.interface';
import { Observable, Observer, fromEvent, interval, of } from 'rxjs';
import { debounceTime, map, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';

import { HttpbinInterface } from '../interfaces/httpbin.interface';
import { ajax } from 'rxjs/ajax';

// This operator is best used when you wish to flatten an inner observable
// but want to manually control the number of inner subscriptions.
// For instance, when using switchMap each inner subscription is completed when the source emits,
// allowing only one active inner subscription. In contrast,
// mergeMap allows for multiple inner subscriptions to be active at a time.
// Because of this, one of the most common use-case for mergeMap is requests that should not be canceled,
// think writes rather than reads. Note that if order must be maintained concatMap is a better option.

const letters$ = of('a', 'b', 'c');

const observer: Observer<string> = {
    next: value => console.log('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
};

letters$.pipe(
    mergeMap<string, Observable<string>>(letter => interval(1000).pipe(
        take<number>(3),
        map<number, string>(value => value + letter)
    ))
).subscribe(observer);

const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
const interval$ = interval(); //10 by default

mouseDown$.pipe(
    mergeMap<MouseEvent, Observable<number>>(
        () => interval$.pipe(
            takeUntil<number>(mouseUp$),
            map<number, number>(number => number / 100),
            debounceTime<number>(100)
        )
    )).subscribe(value => console.log(`you hold the click ${value} seconds`));





const input = document.createElement('input');
const orderList = document.createElement('ol');
document.querySelector('body').append(input, orderList);

const keyboardObservable$ = fromEvent<KeyboardEvent>(input, 'keyup');

const showUsers = (users: Users[]) => {
    orderList.innerHTML = '';
    for (const user of users) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = user.avatar_url;

        const anchor = document.createElement('a');
        anchor.href = user.html_url;
        anchor.text = 'show page';
        anchor.target = '_blank';

        li.append(img);
        li.append(`${user.login} `);
        li.append(anchor);

        orderList.append(li);
    }
};

keyboardObservable$.pipe(
    debounceTime<KeyboardEvent>(1000),
    map<KeyboardEvent, string>((ev) => (ev.target as HTMLInputElement).value),
    mergeMap<string, Observable<GithubInterface>>((user) => ajax.getJSON(`https://api.github.com/search/users?q=${user}`)),
    map<GithubInterface, Users[]>(({ items }) => items)
).subscribe(showUsers);

// if we remove the debounceTime, it will be getting a lot of garbage request.
// the switchMap resolve this problem. becuase it automatically complete() the previous observables. 
// so switchMap only keep only one active subscription, and the mergeMap will keep all the subscriptions that we want.

keyboardObservable$.pipe(
    map<KeyboardEvent, string>((ev) => (ev.target as HTMLInputElement).value),
    switchMap<string, Observable<HttpbinInterface>>((text) => ajax.getJSON(`https://httpbin.org/delay/1?arg=${text}`)),
).subscribe(console.log);

