import { GithubInterface, Users } from '../interfaces/github-users.interface';
import { Observable, Observer, fromEvent } from 'rxjs';
import { debounceTime, map, mergeAll } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

const input = document.createElement('input');
const orderList = document.createElement('ol');
document.querySelector('body').append(input, orderList);

const keyboardObservable$ = fromEvent<KeyboardEvent>(input, 'keyup');

// here we can see an observable that return an observable, and we need to work in on two different places
const observer: Observer<Observable<unknown>> = {
    next: value => console.warn('next ', value),
    error: error => console.warn('error ', error),
    complete: () => console.info('completed')
};

keyboardObservable$.pipe(
    debounceTime(1000),
    map((ev) => {
        const user = (ev.target as HTMLInputElement).value;
        return ajax.getJSON(`https://api.github.com/users/${user}`);
    }),
).subscribe(value => value.pipe(
    map((resp => resp['url']))
).subscribe(console.log),);

//create a function to show a list

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

// the mergeAll operator fix this situation, this is know like: Flattening Operator

keyboardObservable$.pipe(
    debounceTime<KeyboardEvent>(1000),
    map<KeyboardEvent, string>((ev) => (ev.target as HTMLInputElement).value),
    map<string, Observable<GithubInterface>>((user) => ajax.getJSON(`https://api.github.com/search/users?q=${user}`)),
    mergeAll<Observable<GithubInterface>>(),
    map<GithubInterface, Users[]>(({ items }) => items)
).subscribe(showUsers);
